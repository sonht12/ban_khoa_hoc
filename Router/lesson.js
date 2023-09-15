import express from "express"
import { create,getAll,getOne,remove,update } from "../controllers/lesson";
const router = express.Router()
router.post('/lesson',create);
router.get('/lesson',getAll);
router.get('/lesson/:id',getOne);
router.delete('/lesson/:id',remove);
router.put('/lesson/:id',update);
export default router;