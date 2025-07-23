const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    // The actual text content of the comment
    content: {
        type: String,
        required: [true, 'Comment content cannot be empty.'],
        trim: true
    },
    // A reference to the User who wrote the comment.
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Establishes a relationship with the User model
        required: true
    },
    // A reference to the Post this comment belongs to.
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post', // Establishes a relationship with the Post model
        required: true
    },
    // Add the 'likes' array here.
    likes : [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    // This option automatically adds 'createdAt' and 'updatedAt' fields.
    timestamps: true
});

// Create the Mongoose model from the schema.
// This will create/use a 'comments' collection in MongoDB.
module.exports = mongoose.model('Comment', commentSchema);