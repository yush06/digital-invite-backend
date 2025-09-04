import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Invite Route
router.post("/generate", protect, (req, res) => {
  const { eventTitle, date, venue } = req.body;

  if (!eventTitle || !date || !venue) {
    return res.status(400).json({ message: "All fields are required" });
  }

  res.json({
    message: "Invite generated successfully",
    user: req.user,
    event: { eventTitle, date, venue },
  });
});

export default router;
