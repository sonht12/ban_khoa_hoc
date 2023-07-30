import { string } from "joi";
import mongoose from "mongoose";
const highlightChema = new mongoose.Schema(
    {
        name: String,
        description: String,
        Video: String
    },
    { timestamps: true, versionKey: false }
);
export default mongoose.model("highlight", highlightChema);