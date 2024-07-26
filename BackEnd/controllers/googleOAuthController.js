import dotenv from 'dotenv';
import googleModel from '../models/googleOAuthModel.js';

import { OAuth2Client } from 'google-auth-library';
import { Form } from '../service/dataFrom.js';
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, BACKHOST, FRONTHOST } = process.env;
const google = new googleModel();

const client = new OAuth2Client({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET_KEY,
    redirectUri: `${BACKHOST}/googleOAuth/callback`,
});

export const Login = (req, res) => {
    // 產生 Google 授權 URL，如果要取得額外資訊，須在 scope 參數中加入對應欄位
    // 參考：https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
    const Scope = ["profile", "email"].map(item => `https://www.googleapis.com/auth/userinfo.${item}`);
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: Scope,
    });
    res.redirect(authorizeUrl); // 重定向至 Google 授權頁面
}

export const callback = async (req, res) => {
    const { code } = req.query;

    try {
        // 用授權碼換取 token
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        // 透過 Google API 取得用戶資訊
        const userInfo = await client.request({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo'
        });
        // 創建 Token
        const token = await google.CallBack(userInfo.data);

        res.redirect(`${FRONTHOST}?OAuthToken=${token}&OAuthfrom=googleOAuth`); // 跳轉回前端頁面
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching Google user info');
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await google.getUser(req.user);
        if (user) {
            res.send(Form(true, { user: req.user }));
        } else {
            res.status(401).send(Form(false, {}, "用戶不存在"));
        }
        res.end();
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching user info');
        res.end();
    }
}