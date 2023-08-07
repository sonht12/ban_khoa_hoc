import express from "express";
import cors from "cors";
import user from "../Router/user";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const { API } = process.env;

app.use(express.json());
app.use(cors());


app.use("/api", user);


mongoose.connect(API);

export const viteNodeApp = app;
