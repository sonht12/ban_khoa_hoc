import express from "express";
import { Delete, GetAll, GetOne, Update, create } from "../controllers/highlight";
const Highlight_Router = express.Router();

Highlight_Router.post("/highlight", create);
Highlight_Router.get("/highlight", GetAll);
Highlight_Router.get("/highlight/:id", GetOne);
Highlight_Router.put("/highlight/:id", Update);
Highlight_Router.delete("/highlight/:id", Delete);

export default Highlight_Router;
