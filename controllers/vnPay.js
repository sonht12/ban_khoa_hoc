import axios from 'axios';
import crypto from 'crypto'; // Để sử dụng thuật toán SHA256
import config from 'config';
import dateFormat from 'dateformat';
import { stringify } from 'qs';
import { createHmac } from 'crypto'; // Import createHmac từ crypto

export const createPayment = async (req, res) => {
  try {
    const ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');
    const vnpUrl = config.get('vnp_Url');
    const returnUrl = config.get('vnp_ReturnUrl');

    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');
    const orderId = dateFormat(date, 'HHmmss');
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;
    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    let locale = req.body.language;

    if (!locale || locale === '') {
      locale = 'vn';
    }

    const currCode = 'VND';
    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100, // Số tiền cần nhân 100 để đúng định dạng của VnPay
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    // Tạo chữ ký số
    const signData = stringify(vnp_Params, { encode: false });
    const hmac = createHmac('sha512', secretKey);
    const signed = hmac.update(signData, 'utf-8').digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;

    // Tạo URL thanh toán và chuyển hướng người dùng
    const vnpayUrl = `${vnpUrl}?${stringify(vnp_Params, { encode: false })}`;

    res.redirect(vnpayUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Đã xảy ra lỗi khi xử lý thanh toán.');
  }
};


export const getIPN = async (req,res,next) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  const config = require('config');
  const secretKey = config.get('vnp_HashSecret');
  const querystring = require('qs');
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const crypto = require("crypto");     
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
   

  if(secureHash === signed){
      const orderId = vnp_Params['vnp_TxnRef'];
      const rspCode = vnp_Params['vnp_ResponseCode'];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      res.status(200).json({RspCode: '00', Message: 'success'})
  }
  else {
      res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
  }
}

export const getUrl = async (req,res) => {
  const vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const config = require('config');
    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');

    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require("crypto");     
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.render('success', {code: '97'})
    }
}