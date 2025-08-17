import React, { useState } from 'react';
import { api } from '../api';

export default function AddResume() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');

  const submit = async () => {
    if (!name || !skills || !experience) return alert('All fields are required');
    await api.post('/resumes', {
      name,
      skills: skills.split(',').map(s => s.trim()),
      experience: Number(experience)
    });
    setName(''); setSkills(''); setExperience('');
    alert('Resume added!');
  };

  return (
    <div>
      <h2>Add Resume</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Skills (comma separated)" value={skills} onChange={e => setSkills(e.target.value)} />
      <input placeholder="Experience (years)" type="number" value={experience} onChange={e => setExperience(e.target.value)} />
      <button onClick={submit}>Add Resume</button>
    </div>
  );
}
