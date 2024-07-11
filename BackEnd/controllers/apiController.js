const apiModel = require("../models/apiModel");
const usersModel = require("../models/usersModel");

function final(status, data) {
  return {
    success: status,
    data: data
  };
}

exports.getAllTodos = async (req, res) => {
  const todos = await apiModel.getAll();
  res.send(final(true, todos));
  res.end();
};

exports.createTodo = async (req, res) => {
  const create = await apiModel.create(req.body);
  switch (create.status) {
    case "Error":
      res.status(400).send(final(false, create.Msg));
      break;
    default:
      res.send(final(true, create));
      break;
  }
  res.end();
};

exports.updateTodo = async (req, res) => {
  const update = await apiModel.update(req);
  switch (update.status) {
    case "OK":
      res.status(400).send(final(false, update.Msg));
      break;
    default:
      res.send(final(true, update));
      break;
  }
  res.end();
};

exports.deleteTodo = async (req, res) => {
  const _delete = await apiModel.delete(req.params);
  switch (_delete) {
    case "Error":
      res.status(400).send(final(false, _delete.Msg));
      break;
    default:
      res.send(final(true, _delete));
      break;
  }
  res.end();
};
