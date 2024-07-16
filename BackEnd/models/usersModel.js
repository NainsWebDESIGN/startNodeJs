require("dotenv").config(); // 載入.env 檔案
const { jwtKey } = process.env; // 取得環境變數
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;

class UsersModel {
  constructor() {
    this.token = [];
    this.users = {};
  }

  // 1. 註冊
  async SignUp(req) {
    const { email, password, username } = req.body;

    if (this.users[email]) {
      return false;
    }

    // 1-1 加密
    const hashPassword = await bcrypt.hash(password, 10);

    // 1-2 儲存
    this.users[email] = {
      password: hashPassword,
      username,
    };

    // 1-3 回應
    return true;
  }

  // 2. 登入
  async Login(req) {
    const { email, password } = req.body;

    // 2-1 驗證用戶是否存在
    const user = this.users[email];
    if (!user) {
      return "用戶不存在";
    }

    // 2-2 密碼驗證                 密碼, 加密後的密碼
    if (!(await bcrypt.compare(password, user.password))) {
      return "登入錯誤";
    }

    // 2-3 JWT 簽章
    const token = jwt.sign(
      {
        email,
        username: user.username,
      },
      jwtKey
    ); // key原則上會儲存在環境變數

    jwt.verify(token, jwtKey, (err, user) => {
      if (err) {
        return "驗證錯誤";
      }
      this.token.push(`${token}?uuid=${uuid()}`); // 儲存token
      console.log(this.token);
    });

    return token;
  }

  // 3. 驗證用戶(同時取得用戶資料)
  Profile(req) {
    const Authorization = req.headers["authorization"];
    const token = Authorization.split("?uuid=")[0];

    // 3-1 驗證用戶有送token
    if (!token || !this.token.includes(Authorization)) {
      console.log("token", this.token);
      console.log("Authorization", token);
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
