// Import the jsonwebtoken library, which is used to verify and decode JWT tokens
const jwt = require('jsonwebtoken');

// Verify JWT Token
// Define a middleware function to verify JWT tokens
exports.authMiddleware = (req, res, next) => {
    // Extract the JWT token from the Authorization header, if it exists
    const token = req.header('Authorization')?.split(' ')[1];

     // If no token is found, return a 401 error response
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        // Verify the JWT token using the secret key stored in the environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is valid, extract the user data from the decoded token and attach it to the request object
        req.user = decoded;

        // Call the next middleware function in the chain
        next();

    } catch (error) {
        // If the token is invalid or has expired, return a 400 error response
        res.status(400).json({ message: "Invalid token" });
    }
};

// Role-based Authorization Middleware
// Define a middleware function to enforce role-based authorization
exports.roleMiddleware = (requiredRole) => {

    // Return a new middleware function that takes the request, response, and next function as arguments
    return (req, res, next) => {

        // Check if the user's role matches the required role
        if (req.user.role !== requiredRole) {

            // If the user's role does not match, return a 403 error response
            return res.status(403).json({ message: "Access denied" });
        }
        
        // If the user's role matches, call the next middleware function in the chain
        next();
    };
};
