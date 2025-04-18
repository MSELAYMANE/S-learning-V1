require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabases = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Basic Middleware
app.use(cors()); // Enable CORS for all origins (adjust in production)
app.use(express.json());

// Database Connection
connectDatabases()
  .then(() => console.log('Databases connected'))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Basic Error Handling (Yes, it's necessary!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








/*const express = require('express');
const app = express();
const connectDatabases = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Middleware
app.use(express.json());

// Connect to databases
connectDatabases();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/