const express = require("express");
const router = express.Router();
// 假資料庫
const data = require("../public/json/data.json");
const apiController = require("../controllers/apiController");

/* GET home page. */
router.get("/product", apiController.getAllTodos);

router.post("/product", apiController.createTodo);

router.put("/product/:id", apiController.updateTodo);

router.delete("/product/:id", apiController.deleteTodo);

module.exports = router;
