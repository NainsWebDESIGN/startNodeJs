const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// 1. 註冊
router.post("/signup", usersController.SignUp);

// 2. 登入
router.post("/login", usersController.Login);

// 3. 驗證用戶(同時取得用戶資料)
router.get("/profile", usersController.Profile);

module.exports = router;
