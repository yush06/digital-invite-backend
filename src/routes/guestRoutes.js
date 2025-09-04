import express from "express";
import {
  addGuest,
  getGuestsByEvent,
  deleteGuest,
  bulkUploadGuests,
  upload,
} from "../controllers/guestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addGuest); // Add one guest
router.get("/:eventId", protect, getGuestsByEvent); // List guests
router.delete("/:id", protect, deleteGuest); // Delete guest

// Bulk upload via Excel/CSV
router.post("/upload", protect, upload.single("file"), bulkUploadGuests);

export default router;
