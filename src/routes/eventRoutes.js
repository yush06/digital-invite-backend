import express from "express";
import {
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require auth
router.post("/", protect, createEvent); // create an event
router.get("/", protect, getMyEvents); // list my events
router.get("/:id", protect, getEventById); // get event details
router.put("/:id", protect, updateEvent); // update event
router.delete("/:id", protect, deleteEvent); // delete event

export default router;
