const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todosController");

router.get(
  "/",
  // #swagger.ignore = true
  todoController.getAllTodos
);

router.post(
  "/",
  // #swagger.ignore = true
  todoController.createTodo
);

module.exports = router;
