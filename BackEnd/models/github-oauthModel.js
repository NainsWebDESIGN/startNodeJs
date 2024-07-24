import axios from 'axios';
import usersModel from "../models/usersModel.js";
import mysql from "../service/mysql.js";
import dotenv from 'dotenv';

dotenv.config();
const { GITHUB_CLIENT_ID, GITHUB_SECRET } = process.env;

export default class OAuthModel {
    constructor() { }

    async CallBack(query) {
        const { code } = query;
        const tokenURL = `https://github.com/login/oauth/access_token`;
        return await axios.post(tokenURL, null, {
            params: {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_SECRET,
                code: code,
            },
            headers: {
                Accept: 'application/json',
            },
        })
            .then(async response => {
                const { access_token } = response.data;

                return await axios.all([
                    axios.get('https://api.github.com/user', {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }),
                    axios.get('https://api.github.com/user/emails', {
                        headers: { Authorization: `Bearer ${access_token}` },
                    })
                ])
                    .then(axios.spread(async (obj1, obj2) => {
                        // 使用存取 Token 獲取 GitHub 用戶資訊
                        const userResponse = obj1;
                        // 獲取用戶電子郵件地址
                        const emailResponse = obj2;

                        const user = {
                            ...userResponse.data,
                            email: emailResponse.data[0].email,
                            password: "githubToken"
                        };

                        // 此處將用戶資訊存儲到資料庫
                        await new usersModel().SIGNUP({ body: user });

                        return user;
                    }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    }

    getUser(user) {
        return mysql(`SELECT * FROM users WHERE email='${user.email}'`)
            .then(res => {
                user['password'] = res[0].password;
                return user;
            })
            .catch(err => console.log(err))
    }
}
