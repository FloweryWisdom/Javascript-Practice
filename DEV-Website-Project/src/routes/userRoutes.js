const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Post = require('../models/Post'); // We need the Post model
const User = require('../models/User'); // We need the User model too

// --- GET ALL Posts by a Specific User ---

// Endpoint: GET /api/users/:userId/posts
router.get('/:userId/posts', async (req, res, next) => {
    try {
        // Get the user's ID from the URL parameters
        const userId = req.params.userId;

        // Find all posts where the 'author' field matches the userId
        // We can also limit the number of posts and select only certain fields
        const posts = await Post.find({ author: userId })
            .sort( { createdAt: -1 }) // Sort by newest first
            .limit(3) // Get the 3 most recent posts
            .select('title hashtags'); // Only select the 'title' field for this list
        
        if (!posts) {
            // This case is rare, it would just return and empty array if no posts found
            return next(createErrror(404, 'No posts found for this user.'));
        }

        res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
});

// You can add a route to get a user's public profile here later
// router.get('/:userId', ...);

module.exports = router; 