import express from "express";
import {
  addGuest,
  getGuestsByEvent,
  deleteGuest,
} from "../controllers/guestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addGuest); // Add one guest
router.get("/:eventId", protect, getGuestsByEvent); // List guests for an event
router.delete("/:id", protect, deleteGuest); // Delete a guest

export default router;
