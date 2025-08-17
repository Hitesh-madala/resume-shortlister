
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import shortlistRoutes from "./routes/shortlist.js";
import Candidate from "./models/Candidate.js";
import Job from "./models/Job.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/shortlist", shortlistRoutes);

// Test routes (optional, seed candidates/jobs easily)
app.post("/api/candidates", async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);