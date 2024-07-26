import express from "express";
import err from '../service/catchError.js';
import { GetEcPay, GetReturn } from '../controllers/ecpayController.js';

const router = express.Router();

router.post(
    '/',
    /* 	#swagger.tags = ['ecPay']
        #swagger.description = '由此處完成訂單並轉址至綠界金流 SDK' 
      #swagger.parameters['headers'] = {
        in: 'Authorization',
        type: 'string',
        description: {
            TotalAmount: "商品金額", 
            TradeDesc: "商品描述", 
            ItemName: "商品名稱", 
            Email: "信箱"
        }
      } */
    err(GetEcPay)
);

router.post(
    '/return',
    /* 	#swagger.tags = ['ecPay']
        #swagger.description = '取得綠界金流 callback 的訂單資料並比對存入資料庫後回傳 OK|1' 
      #swagger.parameters['headers'] = {
        in: 'Authorization',
        type: 'string',
        description: "綠界金流回傳的訂單資料"   
      } */
    err(GetReturn)
);

export default router;
