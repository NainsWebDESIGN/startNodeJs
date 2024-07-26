import express from "express";
import err from '../service/catchError.js';
import { lineJWT } from '../service/dataFrom.js';
import { getToken } from '../controllers/lineOAuthController.js';

const router = express.Router();

router.post(
    "/",
    /* 	#swagger.tags = ['Line OAuth']
        #swagger.description = '驗證取得 Token 已由前端完成，此 API 僅 JWT decode 並註冊會員資料' 
      #swagger.parameters['headers'] = {
        in: 'Authorization',
        type: 'string',
        description: '加密後的Token' 
      }
        #swagger.responses[200] = { 
          schema: {
            success: "成功或失敗",
            message: "錯誤時的訊息",
            data: {
                status: true, 
                user: {
                  username: "會員名稱",
                  email: "會員信箱",
                  password: "OAuthToken"
                }
            }
          }   
        } */
    lineJWT,
    err(getToken)
);

export default router;
