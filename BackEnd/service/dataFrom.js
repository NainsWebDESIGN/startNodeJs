import crypto from "crypto";
import usersModel from "../models/usersModel.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config(); // 載入.env 檔案
const { MerchantID, HASHKEY, HASHIV, Version, NotifyUrl, ReturnUrl, JWT_SECRET } =
  process.env; // 取得環境變數
const RespondType = "JSON";

export const Form = (status, data, msg = "") => {
  return {
    success: status,
    data: data,
    message: msg,
  };
};

export const Verify = (req) => {
  const status = new usersModel().PROFILE(req);

  switch (status) {
    case "未登入":
      return Form(false, {}, "未登入");
    case "驗證錯誤":
      return Form(false, {}, "驗證錯誤");
    default:
      return Form(true, { message: "成功", status });
  }
};

// 對應文件 P17：使用 aes 加密
// $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));
export const AesCrypt = (TradeInfo) => {
  const encrypt = crypto.createCipheriv("aes-256-cbc", HASHKEY, HASHIV);
  const enc = encrypt.update(genDataChain(TradeInfo), "utf8", "hex");
  return enc + encrypt.final("hex");
};

// 對應文件 P18：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;
export const ShaCrypt = (aesEncrypt) => {
  const sha = crypto.createHash("sha256");
  const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`;

  return sha.update(plainText).digest("hex").toUpperCase();
};

// 對應文件 21, 22 頁：將 aes 解密
export const SesDecrypt = (TradeInfo) => {
  const decrypt = crypto.createDecipheriv("aes256", HASHKEY, HASHIV);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, "hex", "utf8");
  const plainText = text + decrypt.final("utf8");
  const result = plainText.replace(/[\x00-\x20]+/g, "");
  return JSON.parse(result);
};

// 字串組合
function genDataChain(order) {
  return `MerchantID=${MerchantID}&TimeStamp=${order.TimeStamp
    }&Version=${Version}&RespondType=${RespondType}&MerchantOrderNo=${order.MerchantOrderNo
    }&Amt=${order.Amt}&NotifyURL=${encodeURIComponent(
      NotifyUrl
    )}&ReturnURL=${encodeURIComponent(ReturnUrl)}&ItemDesc=${encodeURIComponent(
      order.ItemDesc
    )}&Email=${encodeURIComponent(order.Email)}`;
}

export const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // 令牌無效
      }

      req.user = user; // 附加用戶資訊到請求
      next(); // 繼續處理請求
    });
  } else {
    res.sendStatus(401); // 沒有提供令牌
  }
}