import express from "express";
import err from '../service/catchError.js';

import { authenticateJWT } from '../service/dataFrom.js';
import { callback, getUser, Login } from '../controllers/googleOAuthController.js';
const router = express.Router();


// 授權路由
router.get(
    '/login'
    /* 	#swagger.tags = ['Google OAuth']
        #swagger.description = '直接由這個路由進入Google OAuth授權流程'  
        #swagger.responses[200] = { 
          schema: "重新導向至前端頁面並附上Token"
        } */
    , err(Login)
);
// 回傳路由
router.get(
    '/callback',
    /* 	#swagger.tags = ['Google OAuth']
        #swagger.description = '驗證 Google OAuth 回傳' 
        #swagger.responses[200] = { 
          schema: "重新導向至前端頁面並附上Token"
        } */
    err(callback)
);

router.get(
    '/user',
    /* 	#swagger.tags = ['Google OAuth']
        #swagger.description = '取得由 Google OAuth 驗證的使用者資訊' 
        #swagger.responses[200] = { 
          schema: {
            user: "Google提供的使用者資訊(Object)"
          }
        } */
    authenticateJWT,
    err(getUser)
);

export default router;
