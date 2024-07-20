var express = require("express");
var router = express.Router();
const err = require("../public/js/catchError");
const webPayController = require("../controllers/newebpayController");

router.post("/order", err.catch(webPayController.createOrder));

module.exports = router;
