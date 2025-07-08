const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');

// Import our models and middleware
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const authMiddleware = require('../middlewares/authMiddleware');

// IMPORTANT: Create the router with mergeParams: true
// This allows this router to access URL parameters from its parent router (e.g., :postId)
const router = express.Router({ megerParams: true });

// --- CREATE a New Comment on a Post ---
// Endpoint: POST /api/posts/:postId/comments 
// Requires authentication because a user must be logged in to comment.
router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId; // From authMiddleware
        const { content } = req.body;

        // Validation 
        if (!content) {
            return next(createError(400, 'Comment content cannot be empty.'));
        }
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(createError(400, 'Invalid post ID'));
        }

        // --- Step 1. Create and save the new comment document ---
        const newComment = new Comment({
            content,
            author: userId,
            post: postId
        });
        await newComment.save();

        // --- Step 2. Add the new comment's ID to the corresponding posts's 'comments' array ---
        await Post.findByIdAndUpdate(postId, {
            // The $push operator appends a specified value to an array
            $push: { comments: newComment._id }
        });

        // Populate author details before sending response
        await newComment.populate('author', 'username profilePictureUrl');

        res.status(201).json({
            message: 'Comment added successfully!',
            comment: newComment
        });

    } catch (error) {
        next(error);
    }
})
