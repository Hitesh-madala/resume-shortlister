import React, { useState, useEffect } from 'react';
import { api } from '../api';

export default function JobResumes({ jobId }) {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    if (!jobId) return;
    api.get(`/jobs/${jobId}/resumes`).then(res => setResumes(res.data));
  }, [jobId]);

  if (!jobId) return <p>Select a job to see ranked resumes</p>;

  return (
    <div>
      <h2>Ranked Resumes</h2>
      {resumes.length === 0 ? <p>No resumes found</p> :
        <ul>
          {resumes.map(({ resume, totalScore }, index) => (
            <li key={resume._id}>
              {index + 1}. {resume.name} - Skills: {resume.skills.join(', ')} - Experience: {resume.experience} yrs - Score: {totalScore.toFixed(2)}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
