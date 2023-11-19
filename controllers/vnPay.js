import axios from "axios";
import crypto from "crypto";
import dateFormat from "dateformat";
import qs from "qs";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
export const createPayment = async (req, res, next) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  var tmnCode = process.env.vnp_TmnCode;
  var secretKey = process.env.vnp_HashSecret;
  var vnpUrl = process.env.vnp_Url;
  var returnUrl = process.env.vnp_ReturnUrl;
  var date = new Date();
  var expireDate = moment(date).add(10, "minutes").format("YYYYMMDDHHmmss");
  let createDate = moment(date).format("YYYYMMDDHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var amount = req.body.amount;
  var bankCode = "VNBANK"; //'VNPAYQR' //req.body.bankCode;
  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_ExpireDate"] = expireDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = qs.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

  res.send({ paymentUrl: vnpUrl });
};

export const vnpayIPN = async (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  // Sắp xếp các thuộc tính trong đối tượng vnp_Params
  let orderedVnpParams = {};
  Object.keys(vnp_Params)
    .sort()
    .forEach(function (key) {
      orderedVnpParams[key] = vnp_Params[key];
    });
  vnp_Params = sortObject(vnp_Params);
  let secretKey = process.env.vnp_HashSecret;
  let querystring = qs.stringify(orderedVnpParams, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(querystring, "utf-8").digest("hex");

  let paymentStatus = "0";

  let checkOrderId = true;
  let checkAmount = true;

  if (secureHash === signed) {
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          if (rspCode == "00") {
            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
};

export const vnpReturn = async (req, res) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
};
