// app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json()); // To parse JSON bodies
app.use(cors());         // To allow cross-origin requests

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected ✅'))
.catch((err) => console.error('MongoDB Connection Error ❌:', err));

// Example Route
app.get('/', (req, res) => {
  res.send('Hello, your backend server is working! 🚀');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
