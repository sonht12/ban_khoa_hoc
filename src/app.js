import express from "express";
import cors from "cors";
import user from "../Router/user";
import category from "../Router/category"
import product from "../Router/product";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const { API } = process.env;

app.use(express.json());
app.use(cors());


app.use("/api", user);
app.use("/api",category)
app.use("/api",product)

mongoose.connect(API);

export const viteNodeApp = app;
