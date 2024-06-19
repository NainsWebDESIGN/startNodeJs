var express = require("express");
var router = express.Router();
const Err = require("../public/js/catchError");

// const catchErr = (asyncFun) => {
//   return (req, res, next) => {
//     asyncFun(req, res, next).catch((err) => {
//       console.log("錯誤捕捉: ", err);
//       res.status(500).send({
//         message: "伺服器錯誤",
//         errMsg: err,
//       });
//     }); // Promise
//   };
// };

const errorController = async function (req, res) {
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
  Err.catchError(errorController)
);

module.exports = router;
