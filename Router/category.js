import express from "express";
import {
  Delete,
  GetAll,
  GetOne,
  Update,
  create,
} from "../controllers/category";

const CategoryRoute = express.Router();

CategoryRoute.post("/Category", create);
CategoryRoute.get("/Category/:id", GetOne);
CategoryRoute.get("/Category", GetAll);
CategoryRoute.delete("/Category/:id", Delete);
CategoryRoute.put("/Category/:id", Update);

export default CategoryRoute;

