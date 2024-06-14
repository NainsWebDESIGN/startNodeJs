const todoModel = require("../modules/todosModel");

exports.getAllTodos = (req, res) => {
  const todos = todoModel.getAll();
  res.send({ status: "success", todos });
};

exports.createTodo = (req, res) => {
  const newTodo = todoModel.create(req.body);
  res.send({ status: "success", newTodo });
};
