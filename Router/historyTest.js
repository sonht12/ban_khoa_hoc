import express from "express"
import { create, getOne } from "../controllers/historyTest";
const router = express.Router()
router.post('/history-test/save', create);
router.get('/history-test/:lessonId/:userId',getOne);

export default router;  