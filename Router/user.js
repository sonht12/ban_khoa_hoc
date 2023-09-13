import express from "express";
import { GetAllUser,forgotPassword, GetOneUser, Login, SignUp,DeleteUser, resetPassword, changePassword, send_otp,verify_otp   } from "../controllers/user";
const Router = express.Router();
Router.post("/SignUp", SignUp);
Router.post("/Signin", Login);
Router.get("/user", GetAllUser);
Router.get("/user/:id", GetOneUser);
Router.delete("/user/:id", DeleteUser);
Router.post("/forgotPassword", forgotPassword);
Router.post("/resetPassword", resetPassword);
Router.post("/changePassword", changePassword);
Router.post("/send_otp", send_otp);
Router.post("/verify_otp", verify_otp);

export default Router;
