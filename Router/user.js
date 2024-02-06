import express from "express";
import uploadCloud from "../middlewares/uploader";
import {
  GetAllUser,
  forgotPassword,
  GetOneUser,
  Login,
  SignUp,
  DeleteUser,
  resetPassword,
  changePassword,
  getCurrent,
  refreshAccessToken,
  logout,
  updateUser,
  updateBlockUser
} from "../controllers/user";
import passport from 'passport';
import ('../middlewares/auth');
import { verifyAccessToken } from "../middlewares/verifyToken";
const Router = express.Router();
Router.post("/SignUp", SignUp);
Router.post("/Signin", Login);
Router.get('/current', verifyAccessToken, getCurrent);
Router.post('/refreshtoken', verifyAccessToken, refreshAccessToken);
Router.get('/logout', logout);
Router.get("/user", GetAllUser);
Router.get("/user/:id", GetOneUser);
Router.delete("/user/:id", DeleteUser);
Router.post("/forgotPassword", forgotPassword);
Router.post("/resetPassword", resetPassword);
Router.post("/changePassword", changePassword);
Router.put('/user/:id',uploadCloud.single('img'),updateUser,(err, req, res, next) => {
  if (err) {
      console.log(err);
    res.status(500).json({ error: err.message });
  }
})
Router.post("/user/updateBlock", updateBlockUser)
export default Router;
