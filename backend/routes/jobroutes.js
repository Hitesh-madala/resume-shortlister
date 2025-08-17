const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Resume = require('../models/Resume');

// Add a job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs (for frontend dropdown)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get resumes ranked for a job
router.get('/:jobId/resumes', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const resumes = await Resume.find();

    const ranked = resumes.map(r => {
      const matchingSkills = r.skills.filter(skill => job.requiredSkills.includes(skill));
      const skillScore = matchingSkills.length / job.requiredSkills.length;
      const expScore = (r.experience >= job.minExperience && r.experience <= job.maxExperience) ? 1 : 0;
      return { resume: r, totalScore: skillScore + expScore };
    }).sort((a, b) => b.totalScore - a.totalScore);

    res.json(ranked);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
