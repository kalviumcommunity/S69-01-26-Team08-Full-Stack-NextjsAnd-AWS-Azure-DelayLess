import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train"
  },
  source: String,
  destination: String,
  scheduledTime: String,
  expectedTime: String,
  delayMinutes: Number
});

export default mongoose.models.Schedule ||
  mongoose.model("Schedule", ScheduleSchema);
