const apiModel = require("../models/apiModel");
const formData = require("../public/js/dataFrom");

exports.getAllTodos = async (req, res) => {
  const todos = await apiModel.getAll();
  res.send(formData.form(true, todos));
  res.end();
};

exports.createTodo = async (req, res) => {
  const verify = await formData.verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const create = await apiModel.create(req.body);
    switch (create.status) {
      case "Error":
        res.status(400).send(final(false, {}, create.Msg));
        break;
      default:
        res.send(formData.form(true, create));
        break;
    }
    res.end();
  }
};

exports.updateTodo = async (req, res) => {
  const verify = await formData.verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const update = await apiModel.update(req);
    switch (update.status) {
      case "OK":
        res.status(400).send(formData.form(false, {}, update.Msg));
        break;
      default:
        res.send(formData.form(true, update));
        break;
    }
    res.end();
  }
};

exports.deleteTodo = async (req, res) => {
  const verify = await formData.verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const _delete = await apiModel.delete(req.params);
    switch (_delete) {
      case "Error":
        res.status(400).send(formData.form(false, {}, _delete.Msg));
        break;
      default:
        res.send(formData.form(true, _delete));
        break;
    }
    res.end();
  }
};
