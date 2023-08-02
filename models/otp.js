import mongoose from "mongoose";
const OTPSchema = new mongoose.Schema({
        email:{ type: String, unique: true},
        otp:String,
        createdAt: Date,
        expiresAt: Date,
});
export default mongoose.model("OTP", OTPSchema);