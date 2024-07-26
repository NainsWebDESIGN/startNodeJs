import express from "express";

import err from '../service/catchError.js';
import { callback, getUser } from '../controllers/github-oauthController.js';
import { authenticateJWT } from '../service/dataFrom.js';
const router = express.Router();

// 路由處理 GitHub 回傳
router.get(
  '/callback',
  /* 	#swagger.tags = ['Github OAuth']
      #swagger.description = '驗證 Github OAuth 回傳' 
      #swagger.responses[200] = { 
        schema: "重新導向至前端頁面並附上Token"
      } */
  err(callback)
);

// 受保護的路由範例，需要 JWT 驗證
router.get(
  '/user',
  /* 	#swagger.tags = ['Github OAuth']
      #swagger.description = '取得由 Github OAuth 驗證的使用者資訊' 
      #swagger.responses[200] = { 
        schema: {
          user: "GitHub提供的使用者資訊(Object)"
        }
      } */
  authenticateJWT,
  err(getUser)
);

export default router;
