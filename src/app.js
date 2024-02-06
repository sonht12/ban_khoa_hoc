import express from "express";
import cors from "cors";
import Order from "../models/oder";
import cron from "node-cron";
import user from "../Router/user";
import category from "../Router/category";
import product from "../Router/product";
import lesson from "../Router/lesson";
import mongoose from "mongoose";
import order from "../Router/oder";
import dotenv from "dotenv";
import quizz from "../Router/quizz";
import path from "path";
import { fileURLToPath } from "url";
import Blog from "../Router/Blog";
import vnPay from "../Router/vnPay";
import rating from "../Router/rating";
import comment from "../Router/comment";
import note from "../Router/note";
import CourseProgress from "../Router/learning_process";
import cookieParser from "cookie-parser";
import saveScore from "../Router/score";
import routerVouche from "../Router/vouche";
import checkoutVnpay from "../Router/checkVnpay";
import historyTest from "../Router/historyTest"
import session from "express-session"
import passport from 'passport';
import cookieSession from 'cookie-session';
import UserCheme from "../models/user";

import ('../middlewares/auth');
dotenv.config();
const app = express();
app.use(cookieParser());
const { API } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  })
);
app.use("/api", quizz);
app.use("/api", lesson);
app.use("/api", user);
app.use("/api", Blog);
app.use("/api", category);
app.use("/api", product);
app.use("/api", order);
app.use("/api", vnPay);
app.use("/api", rating);
app.use("/api", comment);
app.use("/api", note);
app.use("/api", CourseProgress);
app.use("/api", saveScore);
app.use("/api", routerVouche);
app.use("/api", historyTest);

app.post("/api/create-payment-vnpay", checkoutVnpay.payment);
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "thanhtoan.html"));
});
// cron.schedule("0 0 * * *", async () => {
//   try {
//     const orders = await Order.find({ orderStatus: { $ne: "Done" } });
//     for (const order of orders) {
//       const orderDate = new Date(order.orderDate);
//       const now = new Date();
//       if (now - orderDate >= 24 * 60 * 60 * 1000) {
//         await Order.findByIdAndUpdate(order._id, {
//           $set: { orderStatus: "Thất bại" },
//         });
//       }
//     }
//     console.log("Cron job executed successfully.");
//   } catch (error) {
//     console.error("Error in cron job:", error);
//   }
// });
const updateOrderStatus = async () => {
  try {
    const orders = await Order.find({ orderStatus: { $ne: "Done" } });
    for (const order of orders) {
      const orderDate = new Date(order.orderDate);
      const now = new Date();
      if (now - orderDate >= 2 * 60 * 1000) {
        await Order.findByIdAndUpdate(order._id, {
          $set: { orderStatus: "Thất bại" },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
const interval = setInterval(updateOrderStatus, 2 * 60 * 1000);
setTimeout(() => {
  clearInterval(interval);
}, 24 * 60 * 60 * 1000);




// gg

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

app.get("/auth/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

app.get("/auth/google", passport.authenticate("google", ["profile", "email"]));

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:5173",
		failureRedirect: "/auth/login/failed",
	})
);
mongoose.connect(API);

export const viteNodeApp = app;

