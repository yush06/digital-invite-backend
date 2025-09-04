import Event from "../models/Event.js";

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, eventType, date, venue, description, template } = req.body;
    if (!title || !date || !venue) {
      return res
        .status(400)
        .json({ message: "title, date and venue are required" });
    }

    const event = new Event({
      title,
      eventType,
      date: new Date(date),
      venue,
      description,
      template,
      createdBy: req.user?.id, // set by auth middleware
    });

    await event.save();
    return res.status(201).json({ message: "Event created", event });
  } catch (err) {
    console.error("createEvent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get list of events for the logged-in user
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id }).sort({
      date: 1,
    });
    return res.json({ events });
  } catch (err) {
    console.error("getMyEvents:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get single event by id (only if belongs to user)
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.json({ event });
  } catch (err) {
    console.error("getEventById:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update event (only owner)
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updates = (({
      title,
      eventType,
      date,
      venue,
      description,
      template,
    }) => ({ title, eventType, date, venue, description, template }))(req.body);

    Object.keys(updates).forEach((k) => {
      if (
        updates[k] !== undefined &&
        updates[k] !== null &&
        updates[k] !== ""
      ) {
        event[k] = k === "date" ? new Date(updates[k]) : updates[k];
      }
    });

    await event.save();
    return res.json({ message: "Event updated", event });
  } catch (err) {
    console.error("updateEvent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete event (and optionally cascade delete guests/invites later)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await event.deleteOne();
    return res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("deleteEvent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
