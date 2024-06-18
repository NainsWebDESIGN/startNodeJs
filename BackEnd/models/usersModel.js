const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UsersModel {
  constructor() {
    this.key = "Nains";
    this.users = {
      username: "123",
      password: "",
    };
  }

  // 1. 註冊
  async SignUp(req) {
    const { email, password, username } = req.body;

    if (this.users[email]) {
      return false;
    }

    // 1-1 加密
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

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
      this.key
    ); // key原則上會儲存在環境變數

    return token;
  }

  // 3. 驗證用戶(同時取得用戶資料)
  Profile(req) {
    const token = req.headers["authorization"];

    // 3-1 驗證用戶有送token
    if (!token) {
      return "未登入";
    }

    // 3-2 進行驗證
    return jwt.verify(token, this.key, (err, user) => {
      if (err) {
        return "驗證錯誤";
      }

      return user;
    });
  }
}

module.exports = new UsersModel();
