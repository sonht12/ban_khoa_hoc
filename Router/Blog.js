import express from "express";

import { GetAllBlog, GetOneBlog, DeleteBlog, updateBlog,createBlog } from "../controllers/Blog";

const Router = express.Router();
Router.post('/blog',createBlog);
Router.get("/blog", GetAllBlog);
Router.get("/blog/:id", GetOneBlog);
Router.delete("/blog/:id", DeleteBlog);
Router.put("/blog/:id", updateBlog);


export default Router;