import express from "express"
import { createOrder , getAllOrders , getOrderById , getAllOrdersByUser, updateOrder } from '../controllers/order';
import { CheckPermission } from "../middlewares/CheckPermission";
const router = express.Router()
router.post('/order/create', CheckPermission, createOrder)
router.get('/order/:id',getOrderById)
router.get('/orders-detail/:id', getAllOrdersByUser)
router.delete('/cancel-order/:id')
router.get('/orders',getAllOrders)
router.put('/order/:id',updateOrder)

export default router;