require("dotenv").config(); // 載入.env 檔案
const { jwtKey } = process.env; // 取得環境變數
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;
const mysql = require("../public/js/database.js");

class UsersModel {
  constructor() {
    this.token = [];
    this.users = {};
  }

  // 1. 註冊
  async SignUp(req) {
    const { email, password, username } = req.body;

    return mysql
      .query(`SELECT * FROM users WHERE email='${email}'`)
      .then(async (res) => {
        if (res.length !== 0) return false;
        // 1-1 加密
        return await bcrypt.hash(password, 10);
      })
      .then((hashPassword) =>
        !hashPassword
          ? false
          : // 1-2 儲存
            mysql
              .query(
                `INSERT INTO users VALUES ('${username}', '${email}', '${hashPassword}')`
              )
              .then((res) => res.affectedTows !== 0)
              .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }

  // 2. 登入
  async Login(req) {
    const { email, password } = req.body;

    return mysql
      .query(`SELECT * FROM users WHERE email='${email}'`)
      .then(async (res) => {
        console.log(res);

        // 2-1 驗證用戶是否存在
        // const user = this.users[email];
        if (res.length == 0) {
          return "用戶不存在";
        }

        // 2-2 密碼驗證                 密碼, 加密後的密碼
        if (!(await bcrypt.compare(password, res.password))) {
          return "登入錯誤";
        }

        // 2-3 JWT 簽章
        const token = jwt.sign(
          {
            email,
            username: res.username,
          },
          jwtKey
        ); // key原則上會儲存在環境變數

        const uid = `${token}?uuid=${uuid()}`;

        jwt.verify(token, jwtKey, (err, user) => {
          if (err) {
            return "驗證錯誤";
          }
          this.token.push(uid); // 儲存token
        });

        return uid;
      })
      .catch((err) => console.log(err));
  }

  // 3. 驗證用戶(同時取得用戶資料)
  Profile(req) {
    const Authorization = req.headers["authorization"];
    const token = Authorization.split("?uuid=")[0];

    // 3-1 驗證用戶有送token
    if (!token || !this.token.includes(Authorization)) {
      return "未登入";
    }

    // 3-2 進行驗證
    return jwt.verify(token, jwtKey, (err, user) => {
      if (err) {
        return "驗證錯誤";
      }

      return user;
    });
  }

  // 4. 登出
  Logout(req) {
    const Authorization = req.headers["authorization"];
    let index = this.token.indexOf(Authorization);
    switch (index) {
      case -1:
        return "未登入";
      default:
        this.token.splice(index, 1); // 刪除token
        return "OK";
    }
  }
}

module.exports = new UsersModel();
