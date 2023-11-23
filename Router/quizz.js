import express from "express"
import { create,getAll,getOne,remove,update } from "../controllers/quizz";
const router = express.Router()
router.post('/quizz',create);
router.get('/quizz',getAll);
router.get('/quizz/:id',getOne);
router.delete('/quizz/:id',remove);
router.put('/quizz/:id',update);
export default router;  