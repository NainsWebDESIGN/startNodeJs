const apiModel = require("../models/apiModel");
const usersModel = require("../models/usersModel");

exports.getAllTodos = (req, res) => {
  const todos = apiModel.getAll();
  res.send({ success: true, data: todos });
  res.end();
};

exports.createTodo = (req, res) => {
  const todos = apiModel.create(req.body);
  res.send({ success: true, data: todos });
  res.end();
};

exports.updateTodo = (req, res) => {
  const todos = apiModel.update(req);
  res.send({
    success: true,
    data: todos,
  });
  res.end();
};

exports.deleteTodo = (req, res) => {
  const todos = apiModel.delete(req.params);
  res.send({
    success: true,
    data: todos,
  });
  res.end();
};
