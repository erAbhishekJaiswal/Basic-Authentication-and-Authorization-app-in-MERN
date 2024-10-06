// Import the express module, which is used to create an Express application
const express = require('express');

// Import the register and login functions from the authController module
const { register, login } = require('../controllers/authController');

// Create a new router object using the express.Router() function
const router = express.Router();

// Define a POST route for the '/register' endpoint that calls the register function
router.post('/register', register);

// Define a POST route for the '/login' endpoint that calls the login function
router.post('/login', login);

// Export the router object to make it available for use in other modules
module.exports = router;
