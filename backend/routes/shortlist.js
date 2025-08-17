import express from "express";
import Candidate from "../models/candidate.js";
import Job from "../models/job.js";

const router = express.Router();

/**
 * GET /api/shortlist?jobId=...&skillWeight=0.7&expWeight=0.3&limit=20
 */
router.get("/", async (req, res) => {
  try {
    const { jobId, skillWeight = 0.7, expWeight = 0.3, limit = 20 } = req.query;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const candidates = await Candidate.find();

    const ranked = candidates.map((c) => {
      // --- Skill Match ---
      const required = job.requiredSkills.map((s) => s.toLowerCase());
      const candidateSkills = c.skills.map((s) => s.toLowerCase());

      const matchingSkills = required.filter((s) =>
        candidateSkills.includes(s)
      );

      const skillScore =
        required.length > 0 ? matchingSkills.length / required.length : 0;

      // --- Experience Match ---
      let expScore = 0;
      if (job.minExperience > 0) {
        expScore = Math.min(c.experience / job.minExperience, 1);
      }

      // --- Final Weighted Score ---
      const finalScore =
        skillScore * parseFloat(skillWeight) +
        expScore * parseFloat(expWeight);

      return {
        candidate: c,
        matchingSkills,
        missingSkills: required.filter((s) => !candidateSkills.includes(s)),
        skillScore: Number(skillScore.toFixed(2)),
        expScore: Number(expScore.toFixed(2)),
        finalScore: Number(finalScore.toFixed(2)),
      };
    });

    ranked.sort((a, b) => b.finalScore - a.finalScore);

    res.json(ranked.slice(0, parseInt(limit)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
