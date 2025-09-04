import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
