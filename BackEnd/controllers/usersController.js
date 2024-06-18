const usersModel = require("../models/usersModel");

// 1. 註冊
exports.SignUp = (req, res) => {
  const status = usersModel.SignUp(req);

  if (!status) {
    res.status(400).send({ error: "用戶已存在" });
  }

  // 1-3 回應
  res.status(201).send({
    message: "註冊成功",
  });

  res.end();
};

// 2. 登入
exports.Login = async (req, res) => {
  const status = await usersModel.Login(req);

  // 2-4 回應
  switch (status) {
    case "用戶不存在":
      res.status(401).send({
        error: "用戶不存在",
      });
      break;
    case "登入錯誤":
      res.status(401).send({
        error: "登入錯誤",
      });
      break;
    default:
      res.send({
        message: "登入成功",
        status,
      });
      break;
  }

  res.end();
};

// 3. 驗證用戶(同時取得用戶資料)
exports.Profile = (req, res) => {
  const status = usersModel.Profile(req);

  // 3-3 回應
  switch (status) {
    case "未登入":
      res.status(401).send({
        error: "未登入",
      });
      break;
    case "驗證錯誤":
      res.status(401).send({
        error: "驗證錯誤",
      });
      break;
    default:
      res.send({
        message: "成功",
        status,
      });
      break;
  }

  res.end();
};
