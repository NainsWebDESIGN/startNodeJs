const crypto = require("crypto");
const usersModel = require("../../models/usersModel");
require("dotenv").config(); // 載入.env 檔案
const {
    MerchantID,
    HASHKEY,
    HASHIV,
    Version,
    PayGateWay,
    NotifyUrl,
    ReturnUrl,
} = process.env; // 取得環境變數
const RespondType = 'JSON';


exports.form = (status, data, msg = "") => {
    return {
        success: status,
        data: data,
        message: msg
    }
}

exports.verify = req => {
    const status = usersModel.Profile(req);

    switch (status) {
        case "未登入":
            return this.form(false, { message: "未登入" });
        case "驗證錯誤":
            return this.form(false, { message: "驗證錯誤" });
        default:
            return this.form(true, { message: "成功", status });
    }
}

// 對應文件 P17：使用 aes 加密
// $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));
exports.aesCrypt = TradeInfo => {
    const encrypt = crypto.createCipheriv('aes-256-cbc', HASHKEY, HASHIV);
    const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex');
    return enc + encrypt.final('hex');
}

// 對應文件 P18：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;
exports.shaCrypt = aesEncrypt => {
    const sha = crypto.createHash('sha256');
    const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`;
  
    return sha.update(plainText).digest('hex').toUpperCase();
}

// 字串組合
function genDataChain(order) {
    return `MerchantID=${MerchantID}&TimeStamp=${
      order.TimeStamp
    }&Version=${Version}&RespondType=${RespondType}&MerchantOrderNo=${
      order.MerchantOrderNo
    }&Amt=${order.Amt}&NotifyURL=${encodeURIComponent(
      NotifyUrl,
    )}&ReturnURL=${encodeURIComponent(ReturnUrl)}&ItemDesc=${encodeURIComponent(
      order.ItemDesc,
    )}&Email=${encodeURIComponent(order.Email)}`;
  }