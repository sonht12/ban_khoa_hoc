import { string } from "joi";
import mongoose from "mongoose";

const CommentCheme = new mongoose.Schema({
  
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
         comment: String,
         name: String,
        hidden: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    }
  
);

export default mongoose.model("Comment", CommentCheme);