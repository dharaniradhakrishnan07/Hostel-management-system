// src/services/api.js

import axios from 'axios';

// Create an Axios instance with the base URL and content type set to application/json
const api = axios.create({
  baseURL: 'https://hostel-management-system-hjgy.onrender.com//api',  // Base URL for your API
  headers: {
    'Content-Type': 'application/json',  // Ensures that the server knows you're sending JSON data
  },
});

export default api;
