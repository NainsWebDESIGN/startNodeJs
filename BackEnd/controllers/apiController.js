import apiModel from "../models/apiModel.js";

import { Form, Verify } from "../service/dataFrom.js";

export const getAllTodos = async (req, res) => {
  const todos = await apiModel.getAll();
  res.send(Form(true, todos));
  res.end();
};

export const createTodo = async (req, res) => {
  const verify = await Verify(req);
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
        res.send(Form(true, create));
        break;
    }
    res.end();
  }
};

export const updateTodo = async (req, res) => {
  const verify = await Verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const update = await apiModel.update(req);
    switch (update.status) {
      case "OK":
        res.status(400).send(Form(false, {}, update.Msg));
        break;
      default:
        res.send(Form(true, update));
        break;
    }
    res.end();
  }
};

export const deleteTodo = async (req, res) => {
  const verify = await Verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const _delete = await apiModel.delete(req.params);
    switch (_delete) {
      case "Error":
        res.status(400).send(Form(false, {}, _delete.Msg));
        break;
      default:
        res.send(Form(true, _delete));
        break;
    }
    res.end();
  }
};
