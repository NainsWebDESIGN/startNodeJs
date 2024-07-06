const apiModel = require("../models/apiModel");

exports.getAllTodos = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = apiModel.getAll();
  res.send({ success: true, data });
  res.end();
};

exports.createTodo = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = apiModel.create(req.body);
  res.send({ success: true, data });
  res.end();
};

exports.updateTodo = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = apiModel.update(req);
  res.send({
    success: true,
    data,
  });
  res.end();
};

exports.deleteTodo = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = apiModel.delete(req.params);
  res.send({
    success: true,
    data,
  });
  res.end();
};
