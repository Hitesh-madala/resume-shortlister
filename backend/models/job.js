import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  requiredSkills: { type: [String], default: [] },
  minExperience: { type: Number, default: 0 } // years
});

export default mongoose.model("Job", JobSchema);
