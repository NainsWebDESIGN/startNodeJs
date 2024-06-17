const apiModel = require("../modules/apiModel");

exports.getAllTodos = (req, res) => {
  const data = apiModel.getAll();
  res.send({ success: true, data });
  res.end();
};

exports.createTodo = (req, res) => {
  const data = apiModel.create(req.body);
  res.send({ success: true, data });
  res.end();
};

exports.updateTodo = (req, res) => {
  const data = apiModel.update(req);
  res.send({
    success: true,
    data,
  });
  res.end();
};

exports.deleteTodo = (req, res) => {
  const data = apiModel.delete(req.params);
  res.send({
    success: true,
    data,
  });
  res.end();
};
