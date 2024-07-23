import crypto from "crypto";
import usersModel from "../models/usersModel.js";
import dotenv from "dotenv";
dotenv.config(); // 載入.env 檔案

const { MerchantID, HASHKEY, HASHIV, Version, NotifyUrl, ReturnUrl } =
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
  const status = usersModel.Profile(req);

  switch (status) {
    case "未登入":
      return this.form(false, {}, "未登入");
    case "驗證錯誤":
      return this.form(false, {}, "驗證錯誤");
    default:
      return this.form(true, { message: "成功", status });
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
  return `MerchantID=${MerchantID}&TimeStamp=${
    order.TimeStamp
  }&Version=${Version}&RespondType=${RespondType}&MerchantOrderNo=${
    order.MerchantOrderNo
  }&Amt=${order.Amt}&NotifyURL=${encodeURIComponent(
    NotifyUrl
  )}&ReturnURL=${encodeURIComponent(ReturnUrl)}&ItemDesc=${encodeURIComponent(
    order.ItemDesc
  )}&Email=${encodeURIComponent(order.Email)}`;
}
