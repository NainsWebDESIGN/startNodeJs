var express = require("express");
var router = express.Router();
const err = require("../public/js/catchError");
const webPayController = require("../controllers/newebpayController");

router.post("/order", err.catch(webPayController.createOrder));


// 確認交易：Notify
router.post('/newebpay_notify', err.catch(webPayController.notifyUrl));

module.exports = router;
