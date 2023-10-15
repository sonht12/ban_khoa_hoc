import express from "express"
import { CheckPermission } from "../middlewares/CheckPermission";
import { createNote,getAllNotes,getNote,deleteNote,updateNote,getNotesByLessonId,getNotesByUserId } from "../controllers/note";
const router = express.Router()
router.post('/note',CheckPermission,createNote);
router.get('/note',getAllNotes);
router.get('/note/:id',getNote);
router.delete('/note/:id',deleteNote);
router.put('/note/:id',updateNote);
router.get('/note/lesson/:lessonId', getNotesByLessonId);
router.get('/note/user/:userId', getNotesByUserId);
export default router;