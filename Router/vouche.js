import express from "express";
import { voucherController } from "../controllers/vouche";
const routerVouche = express.Router();
routerVouche.post("/voucher", voucherController.create);
routerVouche.get("/vouchers", voucherController.getAll);
routerVouche.get("/vouchers/active", voucherController.getActiveVoucher);
routerVouche.get("/voucher/:id", voucherController.getOne);
routerVouche.put("/voucher/:id", voucherController.update);
routerVouche.delete("/voucher/:id", voucherController.delete);
routerVouche.get("/voucher/:id/:idVouche", voucherController.sendVoucheByUser);
routerVouche.get("/voucher/user/:id/:idVouche", voucherController.removeVoucheUser);

export default routerVouche;
