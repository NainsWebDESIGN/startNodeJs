const todoModel = require("../models/todosModel");

exports.getAllTodos = (req, res) => {
  const todos = todoModel.getAll();
  res.send({ success: true, todos });
};

exports.createTodo = (req, res) => {
  const newTodo = todoModel.create(req.body);
  res.send({ success: true, newTodo });
};
