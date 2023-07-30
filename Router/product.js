import express from "express";
import { Create,Delete,GetAll, GetOne, Update, } from "../controllers/products";
const router = express.Router();

router.get("/product", GetAll);
router.get("/product/:id", GetOne);
router.post("/product/",Create);
router.put("/product/:id",Update);
router.delete("/product/:id", Delete)

export default router;
