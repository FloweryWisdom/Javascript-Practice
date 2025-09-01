const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Post = require('../models/Post'); // We need the Post model
const User = require('../models/User'); // We need the User model too
const authMiddleware = require('../middlewares/authMiddleware');

// --- GET User's Own Profile (for settings page) ---
//Endoint: GET /api/users/me
// This is a protected route for the currently logged-in user to get their own data.
router.get('/me', authMiddleware, async (req, res, next) => {
    try {
        // The user's ID is securely provided by the authMiddleware from the JWT.
        const userId = req.userId;

        // Find the user by their ID and exclude the password from the result.
        const user = await User.findById(userId).select('-password');

        if (!user) {
            // This case is unlikely if the token is valid, but it's a good safety check.
            return next(createError(404, 'User not found.'));
        }

        res.status(200).json({ user });

    } catch (error) {
        next(error);
    }
});
// --- UPDATE User's Own Profile ---
// Endpoint: PATCH /api/users/me
// This is a protected route for the currently logged-in user to update their info.
router.patch('/me', authMiddleware, async (req, res, next) => {
    try {
        // We get the user's ID from the authMiddleware, not from the URL params, for security. 
        const userId = req.userId;
        const updates = req.body;

        // Define which fields the user is allowed to update.
        const allowedUpdates = ['name', 'bio', 'location', 'websiteUrl', 'work', 'education', 'skills', 'displayEmail'];

        // Build an object with only the allowed update fields that were actually provided.
        const updateData = {};
        for (const key in updates) {
            if (allowedUpdates.includes(key)) {
                updateData[key] = updates[key]
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators (like maxLength)
        }).select('-password'); // Exclude the password from the returned object

        if (!updatedUser) {
            return next(createError(404, 'User not found.'));
        }

        res.status(200).json({
            message: 'Profile updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
})

// --- GET a User's Public Profile ---
// Endpoint: GET /api/users/:userId
// This is a public route to view any user's profile.
router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Find the user and select only the fields we want to be public.
        // Crucially, we exclude the email unless the user has opted to display it.
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return next(createError(404, 'User not found.'));
        }

        // Convert to a plain object to modify it
        const userObject = user.toObject();

        // If the user has chosen not to dislpay their email, remove it from the object
        if (!userObject.displayEmail) {
            delete userObject.email;
        }

        res.status(200).json(userObject);

    } catch (error) {
        next(error);
    }
})

// --- GET ALL Posts by a Specific User ---
// Endpoint: GET /api/users/:userId/posts
router.get('/:userId/posts', async (req, res, next) => {
    try {
        // Get the user's ID from the URL parameters
        const userId = req.params.userId;

        // --- NEW: Check for an optional 'limit' query parameter ---
        // 'req.query' holds the URL query parameters (e.g., ?limit=3)
        // We parse it to a number. If it's not provided, 'limit' will be null.
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        
        // Add the Mongoose query 
        // Find all posts where the 'author' field matches the userId
        let query = Post.find({ author: userId })
            .sort( { createdAt: -1 }) // Sort by newest first
            .populate('author', 'username name profilePictureUrl');
        
        // If a valid limit was provided in the URL, apply it to the query
        if (limit > 0) {
            query = query.limit(limit)
        }

        // Now execute the final query
        const posts = await query.exec();

        res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
});

// You can add a route to get a user's public profile here later
// router.get('/:userId', ...);

module.exports = router; 