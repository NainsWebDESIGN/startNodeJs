import express from "express";
import err from '../service/catchError.js';
import { GetEcPay, GetReturn } from '../controllers/ecpayController.js';

const router = express.Router();

router.get('/', err(GetEcPay));

router.post('/return', err(GetReturn));

export default router;
