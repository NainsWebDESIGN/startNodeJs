import mysql from "../service/mysql.js";

import { readFile } from "fs/promises";
const orders = JSON.parse(
    await readFile(new URL("../backdata/ecpay.json", import.meta.url))
);
export default class EcPayModel {

    constructor() { }

    OrderStore(params) {
        return new Promise((resolve, reject) => {
            if (orders[params.TradeNo]) {
                reject("Order is have user");
            } else {
                orders[params.TradeNo] = params;
                resolve(true);
            }
        })
    }

    CreatOrder(checkValue) {
        if (!orders[checkValue.MerchantTradeNo]) return false;

        const keys = orders[checkValue.MerchantTradeNo];

        let data = {
            MerchantID: checkValue.MerchantID,
            TradeAmt: checkValue.TradeAmt,
            TradeNo: checkValue.TradeNo,
            MerchantTradeNo: checkValue.MerchantTradeNo,
            IP: "ecpay",
            Bank: checkValue.PaymentType.split("_")[0],
            PaymentType: checkValue.PaymentType.split("_")[1],
            PaymentDate: checkValue.PaymentDate,
            PayerAccount5Code: "ecpay",
            PayBanCode: "ecpay",
            Email: keys.Email,
            ItemDesc: keys.ItemName
        };

        const queryparams = Object.values(data).map(item => `'${item}'`).join(",");

        return mysql(`INSERT INTO orders VALUES (${queryparams})`)
            .then(res => res.affectedTows !== 0)
            .catch(err => console.log(err))
            .finally(() => delete orders[checkValue.MerchantTradeNo]);
    }

}
