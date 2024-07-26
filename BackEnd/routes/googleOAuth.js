import express from "express";
import err from '../service/catchError.js';

import { authenticateJWT } from '../service/dataFrom.js';
import { callback, getUser, Login } from '../controllers/googleOAuthController.js';
const router = express.Router();


// 授權路由
router.get('/login', err(Login));
// 回傳路由
router.get('/callback', err(callback));

router.get('/user', authenticateJWT, err(getUser));

export default router;
