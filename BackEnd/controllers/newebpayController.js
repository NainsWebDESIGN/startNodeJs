import webpayModel from "../models/newebpayModel.js";

import { Form, Verify } from "../service/dataFrom.js";

export const createOrder = async (req, res) => {
  const verify = await Verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const order = webpayModel.Create(req.body);
    res.send(Form(true, order));
    res.end();
  }
};

export const notifyUrl = async (req, res) => {
  console.log("req.body notify data", req.body);
  await webpayModel.NotifyUrl(req.body);
  res.end();
};
