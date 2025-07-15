const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');

// Import our models and middleware
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const authMiddleware = require('../middlewares/authMiddleware');

// IMPORTANT: Create the router with mergeParams: true
// This allows this router to access URL parameters from its parent router (e.g., :postId)
const router = express.Router({ mergeParams: true });

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

        // --- Step 1. Create and save the new comment document first ---
        const newComment = new Comment({
            content,
            author: userId,
            post: postId
        });
        await newComment.save();

        // --- Step 2. Add the new comment's ID to the corresponding posts's 'comments' array ---
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            // The $push operator appends a specified value to an array
            $push: { comments: newComment._id }
        });

        // --- Step 3. If the post doesn't exist, the update will fail. Roll back the comment. ---
        if (!updatedPost) {
            // This prevents creating "orphaned" comments that point to a non-existent post.
            await Comment.findByIdAndDelete(newComment._id);
            return next(createError(404, 'Post not found.'));
        }

        // Populate author details before sending response
        await newComment.populate('author', 'username profilePictureUrl');

        res.status(201).json({
            message: 'Comment added successfully!',
            comment: newComment
        });

    } catch (error) {
        next(error);
    }
});


// --- READ All Comments for a Post ---
// Endpoint: GET /api/posts/:postId/comments
// This is public, so no authMiddleware is needed. 
router.get('/', async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return next(createError(400, 'Invalid post'));
        }

        // --- Check if the post exists before fetching comments ---
        // This provides a more accurate error message if the post ID is invalid
        const post = await Post.findById(postId);
        if (!post) {
            return next(createError(404, 'Post not found.'));
        }

        // Find all comments that have a 'post' field matching our postId
        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 }) // Show newest comments first
            .populate('author', 'username profilePictureUrl'); // Replace author ID with user details

        res.status(200).json(comments);

    } catch (error) {
        next(error);
    }
});

//... other requires and routes ...

// --- LIKE/UNLIKE a Comment ---
// Endpoint: PATCH /api/posts/:postId/comments/:commentId/like
// Using PATCH because we are modifying an existing resource
router.patch('/:commentId/like', authMiddleware, async (req, res, next) => {
    try {
        // Pull out the commentId property from the req.params object and create a new variable alos named commentId with that value
        const { commentId } = req.params; 

        const userId = req.userId // From authMiddleware

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return next(createError(400, 'Invalid comment ID.'));
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(createError(404, 'Comment not found.'));
        }

        // Toggle logic: Check if user has already liked the comment.
        const userIndex = comment.likes.indexOf(userId)
        if (userIndex > -1) {
            // If user's ID is in the array, pull (remove) it.
            comment.likes.pull(userId);
        } else {
            // If user's ID is not in the array, push (add) it.
            comment.likes.push(userId);
        }

        // Save the updated comment
        const updatedComment = await comment.save();

        res.status(200).json({
            message: 'Comment like toggled.',
            comment: updatedComment
        });

    } catch (error) {
        next(error);
    }
})



module.exports = router;