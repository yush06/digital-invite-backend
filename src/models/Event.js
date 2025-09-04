import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      enum: ["wedding", "birthday", "haldi", "anniversary", "other"],
      default: "wedding",
    },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    description: { type: String, default: "" },
    template: { type: String, default: "" }, // theme identifier or name
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
