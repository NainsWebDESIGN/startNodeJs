var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  // #swagger.ignore = true
  a; // 為定義
  res.send({
  message: "正常狀態"
});

module.exports = router;
