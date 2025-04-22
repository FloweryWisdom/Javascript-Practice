//server.js
require('dotenv').config() //load .env variables
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
app.use('api/auth', authRoutes); // Mount auth routes under api/auth prefix



mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected succesfully!'))
    .catch( err => console.error('MongoDB connection error:', err));



// Add error handling middleware (basic example)
const createError = require('http-errors');
// 404 not found
app.use((req, res, next) => {
    next(createError(404, 'Resource not found.'));
});
// General error handler
app.use((req, res, next) => {
    console.error(err.stack); // Log error stack trace
    res.status(err.statur || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

//Middleware to parse JSON request bodies 
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Backend server is running!`);
});

const PORT =  3000; //Use environment variable or default

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

