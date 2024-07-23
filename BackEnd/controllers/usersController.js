import usersModel from "../models/usersModel.js";

import { Form } from "../service/dataFrom.js";

// 1. 註冊
export const SignUp = async (req, res) => {
  const password = await usersModel.SignUp(req);
  // console.log(JSON.stringify(password));

  if (!password) {
    res.status(400).send(Form(false, {}, "用戶已存在"));
  } else {
    // 1-3 回應
    res.status(201).send(Form(true, { message: "註冊成功" }));
  }

  res.end();
};

// 2. 登入
export const Login = async (req, res) => {
  const status = await usersModel.Login(req);

  // 2-4 回應
  switch (status) {
    case "用戶不存在":
      res.status(401).send(Form(false, {}, "用戶不存在"));
      break;
    case "登入錯誤":
      res.status(401).send(Form(false, {}, "登入錯誤"));
      break;
    default:
      res.send(Form(true, { message: "登入成功", status }));
      break;
  }

  res.end();
};

// 3. 驗證用戶(同時取得用戶資料)
export const Profile = (req, res) => {
  const status = usersModel.Profile(req);

  // 3-3 回應
  switch (status) {
    case "未登入":
      res.status(401).send(Form(false, {}, "未登入"));
      break;
    case "驗證錯誤":
      res.status(403).send(Form(false, {}, "驗證錯誤"));
      break;
    default:
      res.send(Form(true, { message: "成功", status }));
      break;
  }

  res.end();
};

export const Logout = (req, res) => {
  const status = usersModel.Logout(req);

  switch (status) {
    case "未登入":
      res.status(401).send(Form(false, {}, status));
      break;
    default:
      res.send(Form(true, { message: status }));
      break;
  }
  res.end();
};
