const Encrypt = require("../public/js/dataFrom");
require("dotenv").config(); // 載入.env 檔案
const {
    MerchantID,
    Version,
    PayGateWay,
    NotifyUrl,
    ReturnUrl,
} = process.env; // 取得環境變數
// const RespondType = 'JSON';
const orders = {};


exports.createOrder = (req, res) => {
    const data = req.body;
    const TimeStamp = Math.round(new Date().getTime() / 1000);
    const order = {
        ItemDesc: data.ItemDesc,
        Email: data.Email,
        PayGateWay: PayGateWay,
        Version: Version,
        MerchantID: MerchantID,
        NotifyUrl: NotifyUrl,
        ReturnUrl: ReturnUrl,
        TimeStamp,
        Amt: parseInt(data.Amt),
        MerchantOrderNo: TimeStamp
    }

    // 進行訂單加密
    // 加密第一段字串，此段主要是提供交易內容給予藍新金流
    const aesEncrypt = Encrypt.aesCrypt(order);
    console.log('aesEncrypt:', aesEncrypt);

    // 使用 HASH 再次 SHA 加密字串，作為驗證使用
    const shaEncrypt = Encrypt.shaCrypt(aesEncrypt);
    console.log('shaEncrypt:', shaEncrypt);
    order.aesEncrypt = aesEncrypt;
    order.shaEncrypt = shaEncrypt;

    orders[TimeStamp] = order;
    // console.log(orders[TimeStamp]);
    res.send(Encrypt.form(true, order));
    res.end();
}