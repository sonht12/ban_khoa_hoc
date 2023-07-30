import mongoose from "mongoose";

const ChemeCategory = new mongoose.Schema(
  {
    name: String,
    Product: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", ChemeCategory);
