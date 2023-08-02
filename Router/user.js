import express from "express";
import { GetAllUser,forgotPassword, GetOneUser, Login, SignUp,DeleteUser, resetPassword } from "../controllers/user";

const Router = express.Router();
Router.post("/SignUp", SignUp);
Router.post("/Signin", Login);
Router.get("/user", GetAllUser);
Router.get("/user/:id", GetOneUser);
Router.delete("/user/:id", DeleteUser);
Router.post("/forgotPassword", forgotPassword);
Router.post("/resetPassword", resetPassword);
export default Router;
