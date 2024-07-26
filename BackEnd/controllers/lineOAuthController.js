import dotenv from 'dotenv';
import mysql from "../service/mysql.js";
import userModel from '../models/usersModel.js';
import { Form } from '../service/dataFrom.js';

dotenv.config();


export const getToken = async (req, res) => {
    const { user } = req;

    let users = {
        login: user.name,
        email: (user.email) ? user.email : "Line OAuth",
        password: "OAuthToken"
    }

    const _user = await new userModel().SIGNUP({ body: users });
    if (_user) {
        res.send(Form(true, { status: true, user: users }));
    } else {
        res.status(401).send(Form(false, {}, "用戶不存在"));
    }

    res.end();
}