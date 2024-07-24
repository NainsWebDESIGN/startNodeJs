import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import OAuthModel from '../models/github-oauthModel.js';

import { Form } from '../service/dataFrom.js';
dotenv.config();
const OAuth = new OAuthModel();

// 從環境變量中獲取 GitHub 和 JWT 的配置信息
const { JWT_SECRET, HOST } = process.env;

export const callback = async (req, res) => {
    // 使用授權碼換取存取 Token
    const user = await OAuth.CallBack(req.query);

    // 生成 JWT 並設置為 cookie
    const token = jwt.sign(user, JWT_SECRET);
    // res.redirect('/index.html'); // 跳轉回前端頁面
    res.redirect(`${HOST}?githubToken=${token}`); // 跳轉回前端頁面
};

export const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // 令牌無效
            }

            req.user = user; // 附加用戶資訊到請求
            next(); // 繼續處理請求
        });
    } else {
        res.sendStatus(401); // 沒有提供令牌
    }
}

export const getUser = async (req, res) => {
    // res.json({ user: req.user }); // 返回驗證後的用戶資訊
    await OAuth.getUser(req.user);
    res.send(Form(true, { user: req.user }));
    res.end();
}