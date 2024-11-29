require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authenticate');
const bodyParser = require('body-parser');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Login route
app.use('/auth', authRoutes);

// API Routes
app.use('/car', carRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
