import express from "express";
import { CheckPermission } from "../middlewares/CheckPermission";

import { GetAllCommentForlesson , getCommentById, DeleteComment, updateComment,createComment,getProductComments } from "../controllers/comment";

const Router = express.Router();
Router.post('/comment',CheckPermission,createComment);
Router.get("/commentforlesson/:idlesson", GetAllCommentForlesson );
Router.get("/comment/:idlesson", getCommentById);
Router.delete("/comment/:id",  DeleteComment);
Router.put("/comment/:id",CheckPermission ,updateComment);
Router.get('/product/:_id/comments',getProductComments)

export default Router;