import express from "express";
import cors from "cors";
import user from "../Router/user";
import category from "../Router/category"
import product from "../Router/product";
import lesson from "../Router/lesson";
import mongoose from "mongoose";
import order from "../Router/OderRouter"
import dotenv from "dotenv";
import quizz from "../Router/quizz";

dotenv.config();
const app = express();

const { API } = process.env;

app.use(express.json());
app.use(cors());
app.use("/api", quizz);
app.use("/api", lesson);
app.use("/api", user);
app.use("/api",category)
app.use("/api",product)
app.use("/api",order)
mongoose.connect(API);

export const viteNodeApp = app;
