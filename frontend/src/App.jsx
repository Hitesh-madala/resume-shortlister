import React, { useState, useEffect } from 'react';
import { api } from './api.js';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Resume Shortlisting Tool</h1>
      <Dashboard />
    </div>
  );
}

export default App;


