// Import the mongoose module, which is used to interact with the MongoDB database
const mongoose = require('mongoose');

// Define user schema
// Define a new schema for the User model using the mongoose.Schema constructor
const UserSchema = new mongoose.Schema({
    // Define a field for the username, which is a required string that must be unique
    username: { type: String, required: true, unique: true },

    // Define a field for the email, which is a string but not required
    email: { type: String },

    // Define a field for the password, which is a required string
    password: { type: String, required: true },

    // Define a field for the role, which is a string that can only be one of the values in the enum array
    // The default value is 'user' if no value is provided
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Create a new model called 'User' based on the UserSchema
const User = mongoose.model('User', UserSchema);

// Export the User model to make it available for use in other modules
module.exports = User;
