// src/server.js
const express = require('express');
const path = require('path'); // Needed for serving static files
const createError = require('http-errors');
// const cors = require('cors'); // Uncomment if you install & use CORS
const authRoutes = require('./routes/authRoutes');
//Add require statements for other route files as you create them

const app = express();

// --- Core Middleware ---
// app.use(cors()); // Apply CORS if needed, usually early
app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files fromt the 'public' directory (located one level up from src)
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- API Routes ---
app.use('/api/auth', authRoutes); // API route mounting
// Mount other routes here (e.g., app.use('/api/posts', postRoutes);)


// -- Basic Root Route (Optional - often handled by static index.hmtl) ---
// This provides a simple API check, seperate from your static frontend
app.get('/api', (req, res) => {
    res.json({ message: 'Backend API is running!'});
});

// --- Error Handling Middleware (Place AFTER all routes) ---
// 404 Not Found Handler (if no routes matched)
app.use((req, res, next) => {
    next(createError(404, 'resource not found.'));
}); 

// General Error Handler (catches errors passed via next(error))
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack trace
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';
    res.status(errorStatus).json({
        error: {
            message: errorMessage,
            status: errorStatus
        }
    });
});

// --- Export the configured app ---
module.exports = app;