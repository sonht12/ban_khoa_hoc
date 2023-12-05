import express from "express";
import Order from "../models/oder";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUser,
  updateOrderStatus,
  DeleteOrder,
  getAllOrdersMonay,
  getCourseSales,
} from "../controllers/order.js";
import { CheckPermission } from "../middlewares/CheckPermission.js";
import { comment2 } from "../controllers/comment2.js";
import { getCommentTree2 } from "../controllers/product.js";
const router = express.Router();
router.post("/order", createOrder);
router.get("/order/:id", getOrderById);
router.get("/orders-detail/:id", getAllOrdersByUser);
router.delete("/order/:id", DeleteOrder);
router.get("/order", getAllOrders);
router.get("/order-many", getAllOrdersMonay);
router.put("/order/:id", updateOrderStatus);
router.get("/revenue", getCourseSales);
router.get("/api", async (req, res) => {
  try {
    const data = await Order.find({});
    return res.json(data);
  } catch (error) {
    return res.status(404).send({
      message: "Error removing",
    });
  }
});
//comments
router.post("/create-comment", comment2.createComment2);
router.get("/get-comment/:commentId", comment2.getCOmmentTree);
router.delete("/remove-comment/:id", comment2.removeComment);
router.delete("/remove-comment/:id", comment2.removeComment);
router.patch("/edit/comment/:id", comment2.editComment);
router.get("/get-src/:id", getCommentTree2);

export default router;
