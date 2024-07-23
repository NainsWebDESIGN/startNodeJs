import webpayModel from "../models/newebpayModel.js";

import { Form, Verify } from "../service/dataFrom.js";
const webpay = new webpayModel();

export const createOrder = async (req, res) => {
  const verify = await Verify(req);
  if (!verify.success) {
    res.status(401).send(verify);
    res.end();
  } else {
    const order = webpay.CREATE(req.body);
    res.send(Form(true, order));
    res.end();
  }
};

export const notifyUrl = async (req, res) => {
  console.log("req.body notify data", req.body);
  await webpay.NOTIFYURL(req.body);
  res.end();
};
