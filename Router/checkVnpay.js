import dotenv from "dotenv";
import crypto from "crypto";
import querystring from "qs";
import moment from "moment";
dotenv.config();
process.env.TZ = "Asia/Ho_Chi_Minh";
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
const checkoutVnpay = {
  payment: async (req, res) => {
    console.log("1");
    try {
      const secretKey = "AKQGTMHAUVVJONTQYGIBVQFFDRIHLWRX";
      let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      const ip =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      const amount = req.body.total;
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = "0NAC2BZW";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_BankCode"] = "NCB";
      vnp_Params["vnp_CreateDate"] = moment(new Date()).format(
        "YYYYMMDDHHmmss"
      );
      vnp_Params["vnp_CurrCode"] = "VND";
      vnp_Params["vnp_IpAddr"] = ip;
      vnp_Params["vnp_Locale"] = "vn";
      vnp_Params["vnp_OrderInfo"] = req.body.voucheId;
      vnp_Params[
        "vnp_ReturnUrl"
      ] = `${"http://localhost:5173/payment/status"}/${
        req.body.inforOrderShipping.course
      }`;
      vnp_Params["vnp_TxnRef"] = moment(new Date()).format(
        "YYYYMMDDHHmmss"
      );
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params = sortObject(vnp_Params);
      const signData = querystring.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac.update(signData).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      res.send({ url: vnpUrl });
    } catch (error) {
      return res.status(500, { message: "Error server" });
    }
  },
};
export default checkoutVnpay;
