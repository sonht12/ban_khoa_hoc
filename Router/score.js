import express from "express";
import { getOne, saveScore } from "../controllers/Score";
const Router = express.Router();
Router.post("/saveScore", saveScore);
Router.get("/saveScore/:id", getOne);
export default Router;
