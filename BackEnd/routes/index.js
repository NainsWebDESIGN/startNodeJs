var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  // #swagger.ignore = true
  res.render("index", { title: "BackEnd" });
});

module.exports = router;
