import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
// In your main App.jsx or index.jsx
import { auth } from './firebaseConfig';

// Temporary debug line (remove in production)
window.__authDebug = auth;
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);