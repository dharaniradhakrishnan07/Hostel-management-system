// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const roomRoutes = require('./routes/roomRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const billingRoutes = require('./routes/billingRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');  // Import the MongoDB connection function

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({origin : "*"}));
app.use(express.json());

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
