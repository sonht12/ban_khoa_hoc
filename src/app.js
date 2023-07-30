import express from "express";
import cors from "cors";
import router from "../Router/product";
import user from "../Router/user";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CategoryRoute from "../Router/category";
import productRouter from '../Router/product'
import Highlight_Router from '../Router/highlight'
dotenv.config();
const app = express();

const { API } = process.env;

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use("/api", user);
app.use("/api", CategoryRoute);
app.use('/api', productRouter)
app.use("/api", Highlight_Router);

mongoose.connect(API);

export const viteNodeApp = app;
