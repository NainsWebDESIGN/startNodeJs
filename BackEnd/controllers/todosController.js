const todoModel = require("../models/todosModel");

exports.getAllTodos = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const todos = todoModel.getAll();
  res.send({ success: true, todos });
};

exports.createTodo = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const newTodo = todoModel.create(req.body);
  res.send({ success: true, newTodo });
};
