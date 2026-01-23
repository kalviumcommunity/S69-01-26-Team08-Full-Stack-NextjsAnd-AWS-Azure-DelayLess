import mongoose from "mongoose";

const StationSchema = new mongoose.Schema({
  name: String,
  code: String,
  line: String
});

export default mongoose.models.Station ||
  mongoose.model("Station", StationSchema);
