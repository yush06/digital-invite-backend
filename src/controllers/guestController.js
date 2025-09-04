import Guest from "../models/Guest.js";
import Event from "../models/Event.js";

// Add a single guest manually
export const addGuest = async (req, res) => {
  try {
    const { name, mobile, email, relation, eventId } = req.body;

    if (!name || !mobile || !eventId) {
      return res
        .status(400)
        .json({ message: "Name, mobile and eventId are required" });
    }

    // Ensure event belongs to logged-in user
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const guest = new Guest({
      name,
      mobile,
      email,
      relation,
      eventId,
      createdBy: req.user.id,
    });

    await guest.save();
    return res.status(201).json({ message: "Guest added", guest });
  } catch (err) {
    console.error("addGuest:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all guests for an event
export const getGuestsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const guests = await Guest.find({ eventId }).sort({ name: 1 });
    return res.json({ guests });
  } catch (err) {
    console.error("getGuestsByEvent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete guest
export const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findById(id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    if (guest.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await guest.deleteOne();
    return res.json({ message: "Guest deleted" });
  } catch (err) {
    console.error("deleteGuest:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
