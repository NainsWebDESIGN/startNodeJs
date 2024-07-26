import usersModel from "../models/usersModel.js";
import mysql from "../service/mysql.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET } = process.env;

export default class OAuthModel {

    constructor() { }

    async CallBack(data) {
        const user = {
            login: data.name,
            email: data.email,
            password: "OAuthToken"
        };

        await new usersModel().SIGNUP({ body: user });

        // 創建 JWT
        return jwt.sign(data, JWT_SECRET);
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
