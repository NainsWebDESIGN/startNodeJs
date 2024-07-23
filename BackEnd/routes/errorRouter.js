import express from "express";
const router = express.Router();
import err from "../service/catchError.js";

const errorController = async (req, res) => {
  a; // 未定義
  res.send({
    message: "正常狀態",
  });
};

// 獨立 Controller
// 錯誤捕捉 => 回傳 500
router.get(
  "/",
  // #swagger.ignore = true
  err(errorController)
);

export default router;
