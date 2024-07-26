import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
  // #swagger.ignore = true
  res.render("index", { title: "123" });
});

export default router;
