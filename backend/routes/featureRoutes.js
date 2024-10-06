// Import the express module, which is used to create an Express application
const express = require('express');

// Import the featureOne, featureTwo, adminFeatureOne, and adminFeatureTwo functions from the featureController module
const { featureOne, featureTwo, adminFeatureOne, adminFeatureTwo } = require('../controllers/featureController');

// Import the authMiddleware and roleMiddleware functions from the authMiddleware module
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Create a new router object using the express.Router() function
const router = express.Router();


// User and Admin Features
// Define routes for user and admin features that require authentication
// The authMiddleware function is used to verify the user's authentication status
router.get('/feature-one', authMiddleware, featureOne);   // Route for feature one, accessible to all authenticated users
router.get('/feature-two', authMiddleware, featureTwo);   // Route for feature two, accessible to all authenticated users

// Admin Only Features
// Define routes for admin-only features that require both authentication and admin role
// The roleMiddleware function is used to verify the user's role
router.get('/admin-feature-one', authMiddleware, roleMiddleware("admin"), adminFeatureOne);   // Route for admin feature one, accessible only to admins
router.get('/admin-feature-two', authMiddleware, roleMiddleware("admin"), adminFeatureTwo);   // Route for admin feature two, accessible only to admins

// Export the router object to make it available for use in other modules
module.exports = router;
