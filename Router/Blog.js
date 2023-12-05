import express from "express";
import uploadCloud from "../middlewares/uploader";
import { GetAllBlog, GetOneBlog, DeleteBlog, updateBlog,createBlog } from "../controllers/Blog";
import { CheckPermission } from "../middlewares/CheckPermission";
const Router = express.Router();
Router.post('/blog',uploadCloud.single('img'),createBlog);
Router.get("/blog", GetAllBlog);
Router.get("/blog/:id", GetOneBlog);
Router.delete("/blog/:id", DeleteBlog);
Router.put("/blog/:id",uploadCloud.single('img'), updateBlog,(err, req, res, next)=>{
    if (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
);


export default Router;