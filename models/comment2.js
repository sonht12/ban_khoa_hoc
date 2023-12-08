import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment2",
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment2",
      },
    ],
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: true,
    },
    imgUser: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const Comment2 = mongoose.model("Comment2", commentSchema);
export default Comment2;
