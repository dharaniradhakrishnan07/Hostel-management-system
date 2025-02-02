import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import the TailwindCSS styles
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a root element and render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
