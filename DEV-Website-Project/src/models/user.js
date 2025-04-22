//models/user.js
const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    profilePictureUrl: { type: String, required: true, default: '' }, // Store the URL
    createdAt: { type: Date, default: Date.now }
    // Add other fields as needed
});

// Pre save hook to hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try { 
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compared entered password with hashed password (for login)
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
