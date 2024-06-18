const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const key = "Nains";
const users = {
  "test@gmail.com": {
    username: "123",
    password: "",
  },
};

router.get("/", (req, res) => {
  let tt = "Test";
  console.log(tt);
  res.send(tt);
  res.end();
});

// 1. 註冊
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  if (users[email]) {
    return res.status(400).send({ error: "用戶已存在" });
  }

  // 1-1 加密
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  // 1-2 儲存
  users[email] = {
    password: hashPassword,
    username,
  };

  // 1-3 回應
  res.status(201).send({
    message: "註冊成功",
  });

  res.end();
});

// 2. 登入
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 2-1 驗證用戶是否存在
  const user = users[email];
  if (!user) {
    return res.status(401).send({
      error: "用戶不存在",
    });
  }

  // 2-2 密碼驗證                 密碼, 加密後的密碼
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({
      error: "登入錯誤",
    });
  }

  // 2-3 JWT 簽章
  const token = jwt.sign(
    {
      email,
      username: user.username,
    },
    key
  ); // key原則上會儲存在環境變數

  // 2-4 回應
  res.send({
    message: "登入成功",
    token,
  });

  res.end();
});

// 3. 驗證用戶(同時取得用戶資料)
router.get("/profile", (req, res) => {
  const token = req.headers["authorization"];

  // 3-1 驗證用戶有送token
  if (!token) {
    return res.status(401).send({
      error: "未登入",
    });
  }

  // 3-2 進行驗證
  jwt.verify(token, key, (err, user) => {
    if (err) {
      return res.status(401).send({
        error: "驗證錯誤",
      });
    }

    res.send({
      message: "成功",
      user,
    });
  });

  res.end();
});

module.exports = router;
