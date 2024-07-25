import mysql from "../service/mysql.js";

import { readFile } from "fs/promises";
const orders = JSON.parse(
    await readFile(new URL("../backdata/ecpay.json", import.meta.url))
);
export default class EcPayModel {

    constructor() { }

    OrderStore(params) {
        const keys = `${params.MerchantTradeDate}${params.TradeNo}`;
        return new Promise((resolve, reject) => {
            if (orders[keys]) {
                reject("Order is have user");
            } else {
                orders[keys] = params;
                console.log(orders);
                resolve(true);
            }
        })
    }

    CreatOrder(checkValue) {
        let _req = {
            MerchantID: '3002607',
            TradeAmt: '1000',
            TradeNo: '2407260214465702',
            MerchantTradeNo: 'ecPay1721931286524',
            IP: null,
            PaymentType: 'WebATM_TAISHIN',
            PaymentType: 'WebATM_TAISHIN',
            PaymentDate: '2024/07/26 02:15:03',
            PayerAccount5Code: null,
            PayBanCode: null,
            Email: null,
            ItemDesc: null
        };
        console.log("checkValue", checkValue);
        const keys = `${checkValue.PaymentDate}${checkValue.MerchantTradeNo}`;
        console.log("keys", orders[keys]);
        console.log("orders", orders);
    }

}
