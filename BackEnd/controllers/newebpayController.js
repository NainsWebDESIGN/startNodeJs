const mysql = require("../public/js/database.js");
const Encrypt = require("../public/js/dataFrom");
require("dotenv").config(); // 載入.env 檔案
const {
    MerchantID,
    Version,
    PayGateWay,
    NotifyUrl,
    ReturnUrl,
} = process.env; // 取得環境變數
const orders = {};


exports.createOrder = async (req, res) => {
    const verify = await Encrypt.verify(req);
    if (!verify.success) {
        res.status(401).send(verify);
        res.end();
    } else {
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
}

exports.notifyUrl = (req, res) => {
    console.log('req.body notify data', req.body);
    const response = req.body;

    // 解密交易內容
    const data = Encrypt.sesDecrypt(response.TradeInfo);
    console.log('data:', data);

    // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
    console.log(orders[data?.Result?.MerchantOrderNo]);
    if (!orders[data?.Result?.MerchantOrderNo]) {
        console.log('找不到訂單');
        return res.end();
    }

    // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
    const thisShaEncrypt = Encrypt.shaCrypt(response.TradeInfo);
    if (!thisShaEncrypt === response.TradeSha) {
        console.log('付款失敗：TradeSha 不一致');
        return res.end();
    }

    const finalData = orders[data?.Result?.MerchantOrderNo];
    const ordersData = {
        MerchantID: data.MerchantID,
        Amt: data.Amt,
        TradeNo: data.TradeNo,
        MerchantOrderNo: data.MerchantOrderNo,
        IP: data.IP,
        EscrowBank: data.EscrowBank,
        PaymentType: data.PaymentType,
        PayTime: data.PayTime,
        PayerAccount5Code: data.PayerAccount5Code,
        PayBanCode: data.PayBankCode,
        Email: finalData.Email,
        ItemDesc: finalData.ItemDesc
    }
    const queryParams = Object.keys(ordersData).map(key => `'${ordersData[key]}'`).join(', ');
    mysql.query(`INSERT INTO orders VALUES (${queryParams})`)
        .then(res => {
            console.log("mysqlMessage", res);
            delete oreders[data?.Result?.MerchantOrderNo];
            // 交易完成，將成功資訊儲存於資料庫
            console.log('付款完成，訂單：', finalData);

            return res.end();
        })
        .catch(err => console.log(err));

}