import express from "express";
import { GetAllUser, GetOneUser, Login, SignUp,DeleteUser } from "../controllers/user";

const Router = express.Router();
Router.post("/SignUp", SignUp);
Router.post("/Signin", Login);
Router.get("/user", GetAllUser);
Router.get("/user/:id", GetOneUser);
Router.delete("/user/:id", DeleteUser)
export default Router;
