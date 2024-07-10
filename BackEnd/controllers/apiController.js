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
  switch (create) {
    case "OK":
      const todos = await apiModel.getAll();
      res.send(final(true, todos));
      break;
    default:
      res.send(final(false, create));
      break;
  }
  res.end();
};

exports.updateTodo = async (req, res) => {
  const update = await apiModel.update(req);
  switch (update) {
    case "OK":
      const todos = await apiModel.getAll();
      res.send(final(true, todos));
      break;
    default:
      res.send(final(false, update));
      break;
  }
  res.end();
};

exports.deleteTodo = async (req, res) => {
  const data = await apiModel.getAll().then(async res => {
    const _delete = await apiModel.delete(req.params, res);
    console.log("_delete", _delete);

    switch (_delete) {
      case "OK":
        const todos = await apiModel.getAll();
        return final(true, todos);
      // res.send(final(true, todos));
      // break;
      default:
        return final(false, _delete);
      // res.send(final(false, _delete));
      // break;
    }
    // res.end();
  })

  res.send(data);
  res.end();
};
