import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    relation: { type: String, default: "" }, // Friend, Family, Colleague, etc.

    // Link to Event
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // Invite status (for later distribution tracking)
    inviteStatus: {
      type: String,
      enum: ["pending", "sent", "delivered", "opened"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guest", guestSchema);
