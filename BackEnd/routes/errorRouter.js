var express = require("express");
var router = express.Router();
const err = require("../public/js/catchError");

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
  err.catch(errorController)
);

module.exports = router;
