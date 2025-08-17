import React, { useState, useEffect } from 'react';
import { api } from '../api';
import AddResume from '../components/Addresume.jSx';
import AddJob from '../components/Addjob.jsx';
import JobResumes from '../components/Jobresumes.jsx';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');

  const fetchJobs = async () => {
    const res = await api.get('/jobs');
    setJobs(res.data);
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <div>
        <AddResume />
        <AddJob refreshJobs={fetchJobs} />
      </div>
      <div>
        <h2>Jobs</h2>
        <select onChange={e => setSelectedJob(e.target.value)} value={selectedJob}>
          <option value="">Select a job</option>
          {jobs.map(job => (
            <option key={job._id} value={job._id}>{job.title}</option>
          ))}
        </select>
        <JobResumes jobId={selectedJob} />
      </div>
    </div>
  );
}
