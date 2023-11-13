import express from "express";
import { getOne, saveScore,getAll,getScoreForprogress, updatestatusVideo } from "../controllers/Score";
const Router = express.Router();
Router.post("/saveScore", saveScore);
Router.put("/saveScore/:id",updatestatusVideo);
Router.get("/saveScore/:id", getOne);
Router.get("/saveScore", getAll);
Router.get("/saveScoreForprogress/:progressId",getScoreForprogress)
export default Router;
