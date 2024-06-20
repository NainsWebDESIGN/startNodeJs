const express = require("express");
const router = express.Router();
const err = require("../public/js/catchError");
const todoController = require("../controllers/todosController");

router.get(
  "/",
  // #swagger.ignore = true
  err.catch(todoController.getAllTodos)
);

router.post(
  "/",
  // #swagger.ignore = true
  err.catch(todoController.createTodo)
);

module.exports = router;
