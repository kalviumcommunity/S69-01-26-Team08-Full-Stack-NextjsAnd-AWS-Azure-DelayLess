import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
  trainNumber: String,
  name: String,
  line: String
});

export default mongoose.models.Train ||
  mongoose.model("Train", TrainSchema);
