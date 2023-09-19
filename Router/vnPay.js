import express from "express";
import {createPayment , getIPN , getUrl} from '../controllers/vnPay'
const Router = express.Router();
Router.post('/vnpay/create-payment', createPayment);
Router.get('/vnpay/vnpay_ipn', getIPN);
Router.get('/vnpay/vnpay_return', getUrl);
export default Router