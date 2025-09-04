import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Request OTP
router.post("/request-otp", async (req, res) => {
  const { mobile } = req.body;

  if (!mobile)
    return res.status(400).json({ message: "Mobile number required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

  let user = await User.findOne({ mobile });
  if (!user) {
    user = new User({ mobile, otp });
  } else {
    user.otp = otp;
  }
  await user.save();

  console.log(`📩 OTP for ${mobile}: ${otp}`); // Later integrate SMS API

  res.json({ message: "OTP sent successfully", otp }); // In production, don't send OTP in response
});

// 🔹 Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({ mobile });
  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  const token = jwt.sign(
    { id: user._id, mobile: user.mobile },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "OTP verified successfully", token });
});

export default router;
