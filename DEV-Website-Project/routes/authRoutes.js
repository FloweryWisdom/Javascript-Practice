//routes/authRoutes.js
const express = require(`express`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const User = require(`../models/User`)//may need to capitalize 'User' like so
const createError = require(`http-errors`); // For error handling
const router = express.Router();

// -- SIGNUP ROUTE --
router.post('/signup', async(req, res, next) => {
    try {
        const { name, username, email, password, profilePictureUrl } = req.body;
        // Basic validation (add more robust validation)
        if (!name || !username || !email || !password || !profilePictureUrl) {
            return next(createError(400, 'Please provide all required fields.'));  
        }

        // Check if user already exists 
        const existingUser = await User.findOne({ $or: [{ email}, {username}] });
        if (existingUser) {
            return next(createError(400, 'Email or username already exists.'));
        }

        // Create new user instance (password hashing happens via pre-save hook)
        const newUser = new User({ name, username, email, password, profilePictureUrl });
        await newUser.save()

        // Generate JWT
        const token = jwt.sign(
            { userId: newUser._id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h'} // Token expiration
        )

        // Don't send password back
        newUser.password = undefined;

        res.status(201).json({
            message: 'User created succesfully!',
            token: token, // Send token to client
            user: newUser // Send user info (without password)
        })
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
});

// -- LOGIN ROUTE --
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body // Or login with username
        
        if (!email || !password) {
            return next(createError(400, 'Please provide email and password!'));
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(401, 'Invalid credentials.')); // User not found
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(createError(401, 'Invalid credentials.')); // Wrong password
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        user.password = undefined; // Don't send password hash
        
        res.status(200).json({
            message: 'Login successful!',
            token: token, 
            user: user
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;




