import React, { useState } from 'react';
import { api } from '../api';

export default function AddJob({ refreshJobs }) {
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [minExp, setMinExp] = useState('');
  const [maxExp, setMaxExp] = useState('');

  const submit = async () => {
    if (!title || !skills || !minExp || !maxExp) return alert('All fields are required');
    await api.post('/jobs', {
      title,
      requiredSkills: skills.split(',').map(s => s.trim()),
      minExperience: Number(minExp),
      maxExperience: Number(maxExp)
    });
    setTitle(''); setSkills(''); setMinExp(''); setMaxExp('');
    alert('Job added!');
    refreshJobs();
  };

  return (
    <div>
      <h2>Add Job</h2>
      <input placeholder="Job Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Required Skills (comma separated)" value={skills} onChange={e => setSkills(e.target.value)} />
      <input placeholder="Min Experience" type="number" value={minExp} onChange={e => setMinExp(e.target.value)} />
      <input placeholder="Max Experience" type="number" value={maxExp} onChange={e => setMaxExp(e.target.value)} />
      <button onClick={submit}>Add Job</button>
    </div>
  );
}
