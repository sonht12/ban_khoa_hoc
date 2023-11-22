import express from "express"
import uploadCloud from "../middlewares/uploader";
import { create,getAll,getOne,remove,update } from "../controllers/lesson";
const router = express.Router()
router.post('/lesson',uploadCloud.single('video'),create,(err, req, res, next) => {
    if (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    }
  });
router.get('/lesson',getAll);
router.get('/lesson/:id',getOne);
router.delete('/lesson/:id',remove);
router.put('/lesson/:id',uploadCloud.single('video'),update);
export default router;