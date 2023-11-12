import express from "express"
import { createOrder , getAllOrders , getOrderById , getAllOrdersByUser, updateOrderStatus , DeleteOrder } from '../controllers/order';
import { CheckPermission } from "../middlewares/CheckPermission";
const router = express.Router()
router.post('/order', CheckPermission, createOrder)
router.get('/order/:id',getOrderById)
router.get('/orders-detail/:id', getAllOrdersByUser)
router.delete('/order/:id', DeleteOrder)
router.get('/order',getAllOrders)
router.put('/order/:id',updateOrderStatus)

export default router;