const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const mongoose = require("mongoose");

// Import your post model
const Post = require('../models/Post');
// Import your authentication middleware
const authMiddleware = require('../middlewares/authMiddleware');

// --- 1. CREATE a New Post --- 
// Endpoint: POST /api/posts/ (or just '/' if mounted with /api/posts prefix)
// Requires authentication
router.post('/', authMiddleware, async (req, res, next) => {
    try {
        // Data for the new posts will come from the request body
        const { title, content, imageUrl, hashtags } = req.body;

        // Basic Validation (you can add more with libraries like express-validator)
        if (!title || !content || !imageUrl) {
            return next(createError(400, 'Title, content and image URL are required.'));
        }

        // Create new post instance 
        const newPost = new Post({
            title,
            content,
            imageUrl,
            hashtags: hashtags || [], // Ensure hashtags is an array, even if not provided
            author: req.userId // req.userId is added by your authMiddleware 
        });

        // Save the post to the database
        const savedPost = await newPost.save()

        // Populate author details before sending response
        await savedPost.populate('author', 'username name profilePictureUrl'); // Select fields to populate

        res.status(201).json({ // 201 Created
            message: 'Post created successfully!',
            post: savedPost

        });
    } catch (error) {
        // Handle potential Mongoose validation errors (e.g., if required fields are missing)
        if (error.name === 'ValidationError') {
            return next(createError(400, error.message));
        }
        next(error) // Pass other errors to the central error handler
    }
});

// --- 2. READ ALL Posts (modified to accept a limit) ---
// Endpoint: Get /api/posts/ (or just '/')
// This route is public (no authMiddleware)
router.get('/', async (req, res, next) => {
    try {
        // Check for a 'limit' query parameter, default to a larger number if not provided.
        const limit = parseInt(req.query.limit) || 20; // Default to 20 posts
        
        // Fetch posts
        const posts = await Post.find()
        .sort({ createdAt: -1 }) // Sort by creation date, newest first
        .limit(limit) // Apply the limit
        .populate('author', 'username name profilePictureUrl bio location education work createdAt'); // .populate() will replace the 'author' ObjectId with actual the user documents fields specified

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    };
});

// --- 3. SEARCH POSTS ---
// Endpoint: GET /api/posts/search?q=yourSearchTerm
router.get('/search', async (req, res, next) => {
    try {
        // The search term will be passed as URL query parameter (e.g., ?q=hell)
        const searchTerm = req.query.q;
        if (!searchTerm) {
            // If no search term is provided, return an empty array
            return res.status(200).json([]);
        }

        // Use the $text operator to perform a text search on the indexed fields.
        // Mongoose will use the text index we created on the Post model. 
        // We also pupulate the author details, just like on the homepage.
        const searchResults = await Post.find({
            $text: { $search: searchTerm }
        }).populate('author', 'username name profilePictureUrl');

        res.status(200).json(searchResults);
    } catch (error) {
        next(error)
    }
});

// --- 4. READ a Single Post by ID ---
// Endpoint: GET /api/posts/:postId
// Public
router.get('/:postId', async (req, res, next) => {
    try {
        const postId = req.params.postId;

        // Validate if postId is a valid MongoDB ObjectId before querying
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(createError(400, 'Invalid post format.'));
        }

        const post = await Post.findById(postId) 
            .populate('author', 'username name profilePictureUrl');

        if (!post) {
            return next(createError(404, 'Post not found.'));
        }  

        res.status(200).json(post)

    } catch (error) {
        next(error)
    }
});



// --- 5. UPDATE a Post by ID --- 
// Endpoint: PATCH /api/posts/:postId (or PUT)
// Requires authentication and user must be the author of the post
router.patch('/:postId', authMiddleware, async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const updates = req.body; // e.g., { title, content, imageUrl, hashtags }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(createError(400, 'Invalid post ID format.'));
        }
        
        const post = await Post.findById(postId);
        if (!post) {
            return next(createError(404, 'Post not found.'));
        }

        // --- Authorization Check: Is the logged-in user the author? ---
        if (post.author.toString() !== req.userId) { // req.userId comes from authMiddleware
            return next(createError('Forbidden: You are not authorized to update this post.'));
        }

        // Update allowed fields (prevent users from updating 'author' or 'createdAt')
        const allowedUpdates = ['title', 'content', 'imageUrl', 'hashtags'];
        for (const key in updates) {
            if (allowedUpdates.includes(key)) {
                post[key] = updates[key];
            }
        }

        // Mongoose 'timestamps: true' will automatically upate 'updatedAt' on save
        const updatedPost = await post.save();
        await updatedPost.populate('author', 'username name profilePictureUrl');

        res.status(200).json({
            message: 'Post updated successfully!',
            post: updatedPost
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(createError(400, error.message));
        }
        next(error)
    }
});

// --- 6. REACT to a Post ---
// Endpoint: PATCH /api/posts/:postId/react
// Requires authentication to know who is reacting.
router.patch('/:postId/react', authMiddleware, async (req, res, next) => {
    try {
        // The type of reaction (e.g. 'heart', 'unicorn') will be sent in the request body.
        const { reactionType } = req.body;
        const postId = req.params.postId;
        const userId = req.userId; // From authMiddleware

        // Validate the reaction type to ensure it's one we support.
        const allowedReactions = ['heart', 'unicorn', 'exploding', 'fire', 'eyes'];
        if (!reactionType || !allowedReactions.includes(reactionType)) {
            return next(createError(400, 'Invalid reaction type.'));
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(createError(400, 'Invalid post ID format.'));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(createError(404, 'Post not found.'));
        }

        // Check if the user is clicking the same reaction they already have.
        const hasReacted = post.reactions[reactionType].includes(userId);

        // First, remove the user's ID from ALL reaction arrays to ensure they only have one. 
        // If user had already selected a reaction type, it gets removed (untoggled)
        allowedReactions.forEach(type => {
            post.reactions[type].pull(userId);
        });

        // If they did NOT already select this emoji before, it means they are adding a new one
        // or switching their reaction. So, we add their ID to the new reaction array.
        if (!hasReacted) {
            post.reactions[reactionType].push(userId);
        }
        // If they *did* already have this reaction, the .pull() above has removed it,
        // effectively toggling it off.

        const updatedPost = await post.save();
        await updatedPost.populate('author', 'username name profilePictureUrl');

        res.status(200).json({
            message: 'Reaction toggled successfully!',
            post: updatedPost
        });

    } catch (error) {
        next(error)   
    }
})

// --- 7. DELETE a Post by ID ---
// Endpoint: DELETE /api/posts/:postId
// Requires authentication AND user must be the author
router.delete('/:postId', authMiddleware, async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(createError(400, 'Invalid post ID format.'));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(createError(404, 'Post not found.'));
        }

        // --- Authorization Check: Is the logged-in user the author? ---
        if (post.author.toString() !== req.userId) {
            return next(createError(403, 'Forbidden: You are not authorized to delete this post.'));
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully.'});
        
    } catch (error) {
        next(error)  
    }
})

module.exports = router;

