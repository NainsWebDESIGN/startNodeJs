import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
  // #swagger.ignore = true
  res.render("index", { title: "結帳失敗" });
});

export default router;
