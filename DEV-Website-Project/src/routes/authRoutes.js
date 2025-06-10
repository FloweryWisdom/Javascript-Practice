// src/outes/authRoutes.js
const express = require(`express`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`); // Library for creating JSON web tokens
const createError = require(`http-errors`); // For error handling
const User = require('../models/User'); // Import the mongoose user model
const router = express.Router(); // Create an Express router instance

// -- SIGNUP ROUTE --
// Handles POST requests to /api/auth/signup
router.post('/signup', async(req, res, next) => {
    // req: request object (contains body, headers, params, etc.)
    // res: response object (used to send status codes, JSON data, etc.)
    // next: function to pass control (often errors) to the next middleware
    try {
        // Destructure data from the request body (parsed by express.json middleware)
        const { name, username, email, password, profilePictureUrl } = req.body;
        // --- Basic Server-Side Validation ---
        // Check if all required fields were provided in the request body
        if (!name || !username || !email || !password || !profilePictureUrl) {
            // If validation fails, create a 400 Bad Request error
            // and pass it to the error handling middleware using next()
            return next(createError(400, 'Please provide all required fields.'));  
        }
        // Consider adding more validation later (e.g., email format, password length)

        // --- Check for Existing User --- 
        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            // Add a property indicating the field, e.g., { field: 'email' }
            return next(createError(400, 'Email already taken.', { field: 'email'}));
        }

        //Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return next(createError(400, 'Username already taken', { field: 'username'}));
        }

        // Add a password validation before creating the user
        if (password.length < 8) { // Example server side check
            return next(createError(400, 'Password must be at least 8 characters loooooong.', { field: 'password'}));
        }

        // Add other password checks (regex for complexity) here...

        // --- Create New User (if all checks passed) ---
        // Create an instance of the User model with the request data
        // Note: We pass the plain password here. The hashing happens automatically
        // due to the pre-save hook defined in the User model (User.js)
        const newUser = new User({ name, username, email, password, profilePictureUrl });
        await newUser.save() // Save the new user document to the MongoDB 'users' collection

        // --- Generate JWT ---
        // Create a token to send back to the client for session management
        const payload = { userId: newUser._id }; // Data to include in the token (keep it minimal)
        const secret = process.env.JWT_SECRET // The secret key from the .env file
        const options = { expiresIn: '1h' }; // Token validity period (e.g., 1 hour)

        const token = jwt.sign(payload, secret, options); // Create the token

        // IMPORTANT: Remove the hashed password before sending the user object back 
        newUser.password = undefined // do we do this because pre-save hook care of it already? (ask chatgippity)

        // --- Prepare Response ---
        // Send a success response
        res.status(201).json({ // 201 Created status code
            message: 'User created succesfully!', 
            token: token, // Send the generated JWT to the client
            user: newUser // Send the created user object (without password)
        })
    } catch (error) {
        // If any error occurs in the try block (DB error, validation error from Mongoose, etc.)
        next(error); // Pass it to the central error handling middleware defined in src/server.js
    }
});

// -- LOGIN ROUTE --
// Handles POST requests to /api/auth/login
router.post('/login', async (req, res, next) => {
    try {
        // Get email and password from the request body
        const { email, password } = req.body // Could also allow login via username

        // Basic validation
        if (!email || !password) {
            return next(createError(400, 'Please provide email and password!'));
        }

        // --- Find User --- 
        // Look for a user in the database matching the provided email
        const user = await User.findOne({ email });
        if (!user) {
            // If no user found, send 401 Unauthorized (don't reveal if email exists)
            return next(createError(401, 'Invalid credentials.')); 
        }

        // --- Compare Passwords ---
        // Use the comparePassword method defined in the User model (User.js)
        // This securely compares the provided plain text password with the stored hash
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // If passwords don't matc, send 401 Unauthorized
            return next(createError(401, 'Invalid credentials.')); // Wrong password
        }

        // --- Generate JWT (User is authenticated) ---
        const payload = { userId: user._id };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: '1h'}; // Or longer/shorter as needed

        const token = jwt.sign(payload, secret, options);

        // --- Prepare Response --
        // Remove password hash before sending user data
        user.password = undefined

        // Send success response 
        res.status(200).json({ // 200 OK status code
            message: 'Login Successful!',
            token: token, // Send the JWT for the client to store
            user: user,
        })
    } catch (error) {
        // Pass any errors to the central error handler
        next(error)
    }
});
// Export the router instance to be used in src/server.js
module.exports = router;




