// src/server.js
const helmet = require('helmet'); // For security headers
const rateLimit = require('express-rate-limit'); // For rate limiting
const express = require('express');
const path = require('path'); // Needed for serving static files
const createError = require('http-errors');
// const cors = require('cors'); // Uncomment if you install & use CORS

//Add require statements for other route files as you create them
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// --- Security Middleware ---
// 1. Helmet: Sets various HTTP headers for security
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "https:"],
        },
    },
}));
// 2. Rate Limiting: Limits requests to 100 per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Limit each IP to 100 requests per 'window'
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
    legacyHeaders: false, // Disable the 'X-RateLimit/*' headers
});
// 3. Auth Rate Limiting: Stricter limits for login/signup
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 10, // Limit each IP to 10 login/signup attempts per window
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});


// --- Core Middleware ---
// app.use(cors()); // Apply CORS if needed, usually early
app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files fromt the 'public' directory (located one level up from src)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Apply the rate limiter AFTER static files, but BEFORE your API routes
app.use(limiter);

// --- API Routes ---
// Mount other routes here (e.g., app.use('/api/posts', postRoutes);)
// API Route Mounting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);

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
            status: errorStatus,
            // include field if it exists on the error object
            ...(err.field && { field: err.field })
        }
    });
});

// --- Export the configured app ---
module.exports = app;