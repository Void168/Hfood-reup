import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: false, unique: true },
    pic: { type: String, required: false },
    content: { type: String, required: false },
    expiry: { type: Date, required: false}
  },
  {
    timestamps: true,
  }
);
const Vouchers = mongoose.model('Vouchers', voucherSchema);

export default Vouchers;