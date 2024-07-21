const formData = require("../public/js/dataFrom");
const webpayModel = require("../models/newebpayModel");


exports.createOrder = async (req, res) => {
    const verify = await formData.verify(req);
    if (!verify.success) {
        res.status(401).send(verify);
        res.end();
    } else {
        const order = webpayModel.Create(req.body);
        res.send(formData.form(true, order));
        res.end();
    }
}

exports.notifyUrl = async (req, res) => {
    console.log('req.body notify data', req.body);
    await webpayModel.NotifyUrl(req.body);
    res.end();
}