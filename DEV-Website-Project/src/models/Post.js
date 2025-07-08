const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    // --- First Argument: Schema Definition Object ---
    {
        title: {
            type: String,
            required: [true, 'Post title is required.'],
            trim: true,
            minLength: [3, 'Title must be at least 3 characters long.'],
            maxLength: [150, 'Title cannot exceed 150 characters.']
        },

        content: {
            type: String,
            required: [true, 'Post content is required.']
        },

        imageUrl: {
            type: String,
            required: [true, 'Post image URL is required.'],
            // You could add a regex here to validate if it's a URL later
            // match: [/^(ftp|http|https)\/\/[^ "]+$/, 'Please enter a valid image URL.']
        },

        hashtags: {
            type: [String], // Defines an array of strings
            default: [] // Defaults to an empty array if no hashtags are provided
            // You can add custom validation for hastags if needed (e.g., no spaces, starts with #)
            // Example: transform each hashtag to lowercase and ensure it starts with # (more advanced)
        },

        author: {
            type: Schema.Types.ObjectId, // This field will store a MongoDB ObjectId
            ref: 'User', // This tells Mongoose that the ObjectId references a document in the 'User' collection
            required: [true, 'Post must have an author.']
        },
        
        // --- Reactions Schema ---
        reactions: {
            heart: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            unicorn: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            exploding: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            fire: [{ type: Schema.Types.ObjectId, ref: 'User' }],
            eyes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
        },
        
        // This will be an array of ObjectIDs, and each ID will reference a document
        // in our new 'Comment' collection.
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, 
    // --- Second Argument: Schema Options Object ---
    {
        timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields (Data type)
    }
);

// Optional: Create indexes for fields you will query often 
// postSchema.index({ title: 'text', content: 'text', hastags: 'text' }); // For text search later

// Create mongoose model from the schema
// Mongoose will create/use a MongoDB collection named 'posts' (pluralized, lowercase)
module.exports = mongoose.model('Post', postSchema);