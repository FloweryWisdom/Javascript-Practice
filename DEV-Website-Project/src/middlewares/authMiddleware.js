const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const authMiddleware = async (req, res, next) => {
    // 1. Get the token from the authorization header
    const authHeader = req.headers.authorization; // Or req.header('Authorization')
    // 2. Check if the token exists and is in the correct format ('Bearer <token>')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // If no token, or incorrect format, user is not authorized
        return next(createError(401, 'Authentication failed: No token provided or invalid format.'));
    }

    // 3. Extract the token string 
    // The token is after "Bearer ", so we split and take the second part
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verify the token 
        // This checks if the token is valid (signed with your JWT_SECRET) and not expired
        // The decoded payload (e.g., { userId: 'someId', iat: ..., exp: ... }) is returned
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Attach user information to the request object 
        // We stored 'userId' in the JWT payload when signing it during login/signup 
        req.userId = decodedPayload.userId; // Make userId available to subsequent route handlers 

        // 6. If token is valid, call next() to pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Handle different JWT verification errors
        if (error.name === 'TokenExpiredError') {
            return next(createError(401, 'Authentication failed: Token expired.'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(createError(401, 'Authentication failed: Token expired.'));
        }
        // For other unexpected errors
        console.error('Auth middleware error:', error);
        return next (createError(500, 'Authentication error.'));
    }
};

module.exports = authMiddleware;