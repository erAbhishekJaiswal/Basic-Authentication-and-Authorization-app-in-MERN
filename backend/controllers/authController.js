const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
// This is an asynchronous function that handles a user registration request
exports.register = async (req, res) => {

    // Create a new user object from the request body
    const ruser = {

        // Extract the username, email, password, and role from the request body
        username : req.body.username,
        email: req.body.email,
        password : req.body.password,
        role : req.body.role
    }

    try {

        // Check if a user with the same username already exists
        const existingUser = await User.findOne({ username: ruser.username });
        
        // If a user with the same username exists, return a 400 error with a message
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        
        // Hash the user's password using bcrypt
        const hashedPassword = await bcrypt.hash(ruser.password, 10);
        
        // Replace the plain text password with the hashed password
        ruser.password = hashedPassword;
        
        // Create a new User document from the ruser object
        const newUser = new User(ruser);
        
        // Save the new user to the database
        const createduser = await newUser.save();
        
        // Return a 201 success response with a message and the created user
        return res.status(201).json({ message: "User registered successfully", createduser });
    
    } catch (error) {
        // Log the error message to the console
        console.log("register error", error.message);
        
        // Return a 500 error with a message
        res.status(500).json({ message: "Server error" });
    }
};






// Login User
exports.login = async (req, res) => {
    // Extract the username and password from the request body
    const { username, password } = req.body;

    try {
        // Find a user with the given username
        const user = await User.findOne({ username });

        // If no user is found, return a 400 error with a message
        if (!user) return res.status(400).json({ message: "User not found" });
        
        // Compare the provided password with the stored password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        
        // If the passwords don't match, return a 400 error with a message
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        // Generate a JSON Web Token (JWT) with the user's ID and role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        user.password = undefined;

        // Return a 200 success response with a message and the user
        return res.status(200).json({ message: "Login successful", token, user });
        // Return the token in the response
        // res.json({ token });

    } catch (error) {
        // Log the error message to the console
        console.log("login error", error.message);
        
        // Return a 500 error with a message
        res.status(500).json({ message: "Server error" });
    }
};
