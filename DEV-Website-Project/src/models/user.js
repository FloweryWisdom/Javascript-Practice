//models/user.js
const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const Schema = mongoose.Schema;

// Define the structure and constraints for documents in the 'users' collection
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, // MondogDB will enforce uniqueness on this field
        trim: true // Removes whitespace from both ends
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true // Ensures email is stored consistently in lowercase
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // Consider adding minlength later fron stronger validation
        // minlength: [8, 'Password must be at least 8 characters long']
    },
    // Store the URL
    profilePictureUrl: {
        type: String,
        required: [true, 'Profile picture URL is required']
    },
    // ADD OTHER FIELDS AS NECESSARY
    // These are all optional strings that the user can fill out in their settings.
    bio: { type: String, default: '', maxLength: 200 },
    location: { type: String, default: '', maxLength: 100 },
    websiteUrl: { type: String, default: '', maxLength: 100 },
    work: { type: String, default: '', maxLength: 100 },
    education: { type: String, default: '', maxLength: 100 },
    skills: { type: String, default: '', maxLength: 200 }, // Storing as a single string
    displayEmail: { type: Boolean, default: false } // To control email visibility 
}, { timestamps: true }); // 'timestamps: true' automatically adds createdAt & updatedAt

// --- Mongoose Middleware (Pre-save Hook) ---
// This function runs automatically *before* a 'save' operation happens on a User document
userSchema.pre('save', async function(next) {
    // 'this' refers to the User document being saved
    // Only hash the password if it's a new user or the password field was modified
    if (!this.isModified('password')) {
        return next(); // If password not modified, skip hashing and proceed 
    }
    try { 
        // Generate a salt (random data) to add to the password before hashing
        // The number (10) determines the complexity/cost of hashing (higher is slower but more secure)
        const salt = await bcrypt.genSalt(10); // Generate salt
        // Hash the plain text password along with the salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next(); // Proceed with the save operation
    } catch (error) {
        next(error); // Pass any error to Mongoose's error handling
    }
});

// --- Mongoose Instance Method ---
// Method to compared entered password with hashed password (for login)
// Adds a custom method to all User document instances for password comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
    // 'this.password refers to the hashed password stored in the database for this user instance
    // 'candidatePassword' is the plain text password provided by the user during login
    //bcrypt.compare handles retrieving the salt from the stored hash and comparing securely
    return bcrypt.compare(candidatePassword, this.password);
};

// Create the mongoose model based on the schema
// Mongoose will typically create/use a MongoDB collection named 'users' (pluralized, lowercase)

module.exports = mongoose.model('User', userSchema);
