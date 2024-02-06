import moment from "moment";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

moment().format();

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    // discount: { type: Number, require: true },
    sale: { type: Number, require: true },
    type: { type: Number, default: 0 }, //0 giảm tiền, 1 giảm theo %
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: () => moment().add(7, "days").toDate() },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);
voucherSchema.plugin(mongoosePaginate);

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
