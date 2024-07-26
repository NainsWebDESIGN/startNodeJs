import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "../service/mysql.js";
import dotenv from "dotenv";
dotenv.config(); // 載入.env 檔案

import { v4 as uuid } from "uuid";
import { readFile } from "fs/promises";
const Token = JSON.parse(
  await readFile(new URL("../backdata/data.json", import.meta.url))
);
const { JWT_SECRET } = process.env; // 取得環境變數

export default class UsersModel {
  constructor() { }

  // 1. 註冊
  async SIGNUP(req) {
    const { password, email } = req.body;
    const signup = (username, email, password) => {
      return mysql(`INSERT INTO users VALUES ('${username}', '${email}', '${password}')`)
        .then((res) => res.affectedTows !== 0)
        .catch((err) => console.log(err))
    };

    return mysql(`SELECT * FROM users WHERE email='${email}'`)
      .then(async (res) => {
        if (res.length !== 0 && res[0].password == "OAuthToken") {
          return "OAuthSignUped";
        } else if (res.length !== 0) {
          return false;
        } else {
          // 1-1 加密
          switch (password) {
            case "OAuthToken":
              return password;
            default:
              return await bcrypt.hash(password, 10);
          }
        }
      })
      .then((hashPassword) => {
        if (!hashPassword) {
          return false;
        } else {
          if (hashPassword == "githubSignuped") {
            return "OK";
          }
          // 1-2 儲存
          switch (password) {
            case "OAuthToken":
              const { login } = req.body;
              return signup(login, email, hashPassword);
            default:
              const { username } = req.body;
              return signup(username, email, hashPassword);
          }
        }
      })
      .catch((err) => console.log(err));

  }

  // 2. 登入
  async LOGIN(req) {
    const { email, password } = req.body;

    return (
      mysql(`SELECT * FROM users WHERE email='${email}'`)
        .then(async (res) => {
          // console.log(res);

          // 2-1 驗證用戶是否存在
          if (res.length == 0) {
            return "用戶不存在";
          }

          // 2-2 密碼驗證                 密碼, 加密後的密碼
          if (res[0].password !== "OAuthToken" && !(await bcrypt.compare(password, res[0].password))) {
            return "登入錯誤";
          }

          // 2-3 JWT 簽章
          const token = jwt.sign(
            {
              email,
              username: res.username,
            },
            JWT_SECRET
          ); // key原則上會儲存在環境變數

          const uid = `${token}?uuid=${uuid()}`;

          jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
              return "驗證錯誤";
            }
            Token.push(uid); // 儲存token
          });

          // console.log("token", Token);

          return uid;
        })
        .catch((err) => console.log(err))
    );
  }

  // 3. 驗證用戶(同時取得用戶資料)
  PROFILE(req) {
    const Authorization = req.headers["authorization"];
    const token = Authorization.split("?uuid=")[0];

    // 3-1 驗證用戶有送token
    if (!token || !Token.includes(Authorization)) {
      return "未登入";
    }

    // 3-2 進行驗證
    return jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return "驗證錯誤";
      }

      return user;
    });
  }

  // 4. 登出
  LOGOUT(req) {
    const Authorization = req.headers["authorization"];
    let index = Token.indexOf(Authorization);
    switch (index) {
      case -1:
        return "未登入";
      default:
        Token.splice(index, 1); // 刪除token
        return "OK";
    }
  }
}

