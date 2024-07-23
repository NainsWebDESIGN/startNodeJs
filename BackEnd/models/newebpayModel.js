import mysql from "../service/mysql.js";
import dotenv from "dotenv";
dotenv.config(); // 載入.env 檔案

import { AesCrypt, ShaCrypt, SesDecrypt } from "../service/dataFrom.js";
const { MerchantID, Version, PayGateWay, NotifyUrl, ReturnUrl } = process.env; // 取得環境變數

export default class NewebPayModel {
  constructor() {
    this.orders = {};
  }

  CREATE(data) {
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
      MerchantOrderNo: TimeStamp,
    };

    // 進行訂單加密
    // 加密第一段字串，此段主要是提供交易內容給予藍新金流
    const aesEncrypt = AesCrypt(order);
    // console.log('aesEncrypt:', aesEncrypt);

    // 使用 HASH 再次 SHA 加密字串，作為驗證使用
    const shaEncrypt = ShaCrypt(aesEncrypt);
    // console.log('shaEncrypt:', shaEncrypt);
    order.aesEncrypt = aesEncrypt;
    order.shaEncrypt = shaEncrypt;

    this.orders[TimeStamp] = order;
    // console.log(this.orders[TimeStamp]);
    return order;
  }

  NOTIFYURL(response) {
    // 解密交易內容
    const data = SesDecrypt(response.TradeInfo);
    // console.log("data:", data);

    // 取得交易內容，並查詢本地端資料庫是否有相符的訂單
    // console.log(this.orders[data?.Result?.MerchantOrderNo]);
    if (!this.orders[data?.Result?.MerchantOrderNo]) {
      console.log("找不到訂單");
      return res.end();
    }

    // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
    const thisShaEncrypt = ShaCrypt(response.TradeInfo);
    if (!thisShaEncrypt === response.TradeSha) {
      console.log("付款失敗：TradeSha 不一致");
      return res.end();
    }

    const finalData = this.orders[data?.Result?.MerchantOrderNo];
    const ordersData = {
      MerchantID: data?.Result?.MerchantID,
      Amt: data?.Result?.Amt,
      TradeNo: data?.Result?.TradeNo,
      MerchantOrderNo: data?.Result?.MerchantOrderNo,
      IP: data?.Result?.IP,
      EscrowBank: data?.Result?.EscrowBank,
      PaymentType: data?.Result?.PaymentType,
      PayTime: data?.Result?.PayTime,
      PayerAccount5Code: data?.Result?.PayerAccount5Code,
      PayBanCode: data?.Result?.PayBankCode,
      Email: finalData.Email,
      ItemDesc: finalData.ItemDesc,
    };
    const queryParams = Object.keys(ordersData)
      .map((key) => `'${ordersData[key]}'`)
      .join(", ");
    return mysql(`INSERT INTO orders VALUES (${queryParams})`)
      .then((res) => {
        // console.log("mysqlMessage", res);
        // 交易完成，將成功資訊儲存於資料庫
        // console.log("付款完成，訂單：", finalData);
        delete this.orders[data?.Result?.MerchantOrderNo];
        return "付款完成";
      })
      .catch((err) => console.log(err));
  }
}
