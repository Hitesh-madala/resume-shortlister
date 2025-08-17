import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String], default: [] },
  experience: { type: Number, default: 0 } // years
});

export default mongoose.model("Candidate", CandidateSchema);
