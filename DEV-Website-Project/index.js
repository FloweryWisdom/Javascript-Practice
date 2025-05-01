require('dotenv').config() //load .env variables FIRST

const mongoose = require('mongoose');
const app = require('./src/server'); // Require the configured Express app from src/server.js

const PORT =  process.env.PORT || 3001; //Use environment variable or default


// --- Database Connection --- 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected succesfully!');
        // --- Start Server ONLY after DB connection is successful ---
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    })
    .catch( err => {
        console.error('MongoDB connection error:', err);  
        // Optional: Exit the process if the DB connection fails on startup 
        process.exit;
    });
