import express from "express";
const router = express.Router();
import err from "../service/catchError.js";

import { createOrder, notifyUrl } from "../controllers/newebpayController.js";

router.post(
  "/order",
  /* 	#swagger.tags = ['Orders']
        #swagger.description = '建立並加密訂單確認資訊' 
            #swagger.parameters['obj'] = {
          in: 'body',
          description: '訂單內容',
          required: true,
          schema: { 
            "ItemDesc": "商品名稱",
            "Amt": "價格",
            "Email": "信箱",
          }
        } 
        #swagger.responses[200] = { 
          schema: {
            success: "成功或失敗",
            message: "錯誤時的訊息",
            data: {
                ItemDesc: "商品名稱",
                Email: "信箱",
                PayGateWay: "藍新金流 API",
                Version: "藍新金流版本",
                MerchantID: "商店 ID",
                NotifyUrl: "結帳完成後通知後端的 URL",
                ReturnUrl: "結帳完成後通知前端的 URL",
                TimeStamp: "時間戳",
                Amt: "價格",
                MerchantOrderNo: "訂單編號(與時間戳相同)"
            }
          }
        } */
  err(createOrder)
);

// 確認交易：Notify
router.post(
  "/newebpay_notify",
  /* 	#swagger.tags = ['Orders']
        #swagger.description = '將訂單加入資料庫' 
            #swagger.parameters['obj'] = {
          in: 'body',
          description: '結帳完成的資料',
          required: true,
          schema: {
            MerchantID: "商店 ID",
            Amt: "價格",
            TradeNo: "加密資訊",
            MerchantOrderNo: "訂單編號(與時間戳相同)",
            IP: "IP 位址",
            EscrowBank: "用哪間銀行",
            PaymentType: "付款方式",
            PayTime: "付款時間",
            PayerAccount5Code: "付款人帳號末五碼",
            PayBanCode: "銀行編號"
          }
        } */
  err(notifyUrl)
);

export default router;
