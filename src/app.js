import express from "express";
import cors from "cors";
import user from "../Router/user";
import category from "../Router/category"
import product from "../Router/product";
import lesson from "../Router/lesson";
import mongoose from "mongoose";
import order from "../Router/oder"
import dotenv from "dotenv";
import quizz from "../Router/quizz";
import Blog from "../Router/Blog";
import vnPay from '../Router/vnPay';
import rating from '../Router/rating'
import comment from '../Router/comment'
import cookieParser from "cookie-parser"
dotenv.config();
const app = express();
app.use(cookieParser())
const { API } = process.env;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use("/api", quizz);
app.use("/api", lesson);
app.use("/api", user);
app.use('/api',Blog)
app.use("/api",category)
app.use("/api",product)
app.use("/api",order)
app.use("/api",vnPay)
app.use("/api",rating)
app.use("/api",comment)
mongoose.connect(API);

export const viteNodeApp = app;
