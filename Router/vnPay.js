import express from "express";
import {createPayment, vnpReturn , vnpayIPN } from '../controllers/vnPay'
const Router = express.Router();
Router.post('/create-payment', createPayment);
Router.get('/vnpay_ipn', vnpayIPN);
Router.get('/vnpay_return', vnpReturn);
export default Router