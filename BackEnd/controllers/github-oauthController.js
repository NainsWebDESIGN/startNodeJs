import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import OAuthModel from '../models/github-oauthModel.js';

import { Form } from '../service/dataFrom.js';
dotenv.config();
const OAuth = new OAuthModel();

// 從環境變量中獲取 GitHub 和 JWT 的配置信息
const { JWT_SECRET, FRONTHOST } = process.env;

export const callback = async (req, res) => {
    // 使用授權碼換取存取 Token
    const user = await OAuth.CallBack(req.query);

    // 生成 JWT 並設置為 cookie
    const token = jwt.sign(user, JWT_SECRET);
    // res.redirect('/index.html'); // 跳轉回前端頁面
    res.redirect(`${FRONTHOST}?OAuthToken=${token}&OAuthfrom=githubOAuth`); // 跳轉回前端頁面
};

export const getUser = async (req, res) => {
    // res.json({ user: req.user }); // 返回驗證後的用戶資訊
    const user = await OAuth.getUser(req.user);

    if (user) {
        res.send(Form(true, { user: req.user }));
    } else {
        res.status(401).send(Form(false, {}, "用戶不存在"));
    }

    res.end();

}