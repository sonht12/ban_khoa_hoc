import express from "express";
const Router = express.Router();
Router.post("/otp", async(req,res)=>{
    try{
        const {email, subject, message, duration }= req.body;
    }catch (error){

    }
});
export default Router;
