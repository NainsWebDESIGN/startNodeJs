import dotenv from 'dotenv';

dotenv.config();
// 綠界提供的 SDK
import ecpay_payment from 'ecpay_aio_nodejs';

const { MERCHANTID, ECHASHKEY, ECHASHIV, BACKHOST, ReturnUrl } = process.env;

// SDK 提供的範例，初始化
// https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
const options = {
    OperationMode: 'Test', //Test or Production
    MercProfile: {
        MerchantID: MERCHANTID,
        HashKey: ECHASHKEY,
        HashIV: ECHASHIV,
        TransMsg: "測試 TransMsg"
    },
    IgnorePayment: [
        //    "Credit",
        //    "WebATM",
        //    "ATM",
        //    "CVS",
        //    "BARCODE",
        //    "AndroidPay"
    ],
    IsProjectContractor: false,
};
let TradeNo;

export const GetEcPay = (req, res) => {
    const { TotalAmount, TradeDesc, ItemName } = req.body;

    // SDK 提供的範例，參數設定
    // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
    const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    });
    TradeNo = 'ecPay' + new Date().getTime();
    let base_param = {
        MerchantTradeNo: TradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
        MerchantTradeDate,
        TotalAmount: TotalAmount,
        TradeDesc: TradeDesc,
        ItemName: ItemName,
        ReturnURL: `${BACKHOST}/ecPay/return`,
        ClientBackURL: ReturnUrl,
    };
    const create = new ecpay_payment(options);

    // 注意：在此事直接提供 html + js 直接觸發的範例，直接從前端觸發付款行為
    const html = create.payment_client.aio_check_out_all(base_param);
    // console.log(html);
    res.render('ecpay', { title: 'Loading...', html });
}

// 後端接收綠界回傳的資料
export const GetReturn = async (req, res) => {
    console.log('req.body:', req.body);

    const { CheckMacValue } = req.body;
    const data = { ...req.body };
    delete data.CheckMacValue; // 此段不驗證

    const create = new ecpay_payment(options);
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

    console.log(
        '確認交易正確性：',
        CheckMacValue === checkValue,
        CheckMacValue,
        checkValue,
    );

    // 交易成功後，需要回傳 1|OK 給綠界
    res.send("1|OK");
}