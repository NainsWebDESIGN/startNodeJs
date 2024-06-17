const apiModel = require("../modules/apiModel");

exports.getAllTodos = (req, res) => {
  const api = apiModel.getAll();
  res.send({ success: true, api });
  res.end();
};

exports.createTodo = (req, res) => {
  const newTodo = apiModel.create(req.body);
  res.send({ success: true, newTodo });
  res.end();
};

exports.updateTodo = (req, res) => {
  const newTodo = apiModel.update(req);
  res.send({
    status:
      newTodo == "Success" ? "Success Update" : `Filed Update: ${newTodo}`,
  });
  res.end();
};

exports.deleteTodo = (req, res) => {
  const newTodo = apiModel.delete(req.params);
  res.send({
    status:
      newTodo == "Success" ? "Success Delete" : `Filed Delete: ${newTodo}`,
  });
  res.end();
};
