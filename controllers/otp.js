import OTPSchema from "../models/otp";
import genarateOTP from "../util/generateOTP";
const sendOTP = async ({email,subject, message, duration = 1 })=>{
    try{
        if(!(email && subject && message )){
            throw Error("Provide values for email, subject, message");
        }
        // clear any old record
        await OTPSchema.deleteOne({ email });
        const genarateOTP = await genarateOTP();
        
    }catch(error){

    }
}