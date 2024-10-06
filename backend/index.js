// Import the express module, which is used to create an Express application
const express = require('express');

// Import the mongoose module, which is used to interact with the MongoDB database
const mongoose = require('mongoose');

// Import the cors module, which is used to enable CORS (Cross-Origin Resource Sharing) in the application
const cors = require('cors');

// Load environment variables from the .env file using the dotenv module
require('dotenv').config();

// Import routes for authentication and features
const authRoutes = require('./routes/authRoutes');
const featureRoutes = require('./routes/featureRoutes');

// Create a new Express application
const app = express();

// Middleware
// Enable CORS in the application to allow requests from different origins
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Routes
// Mount the authentication routes at the /api/auth endpoint
app.use('/api/auth', authRoutes);

// Mount the feature routes at the /api/features endpoint
app.use('/api/features', featureRoutes);

// MongoDB Connection
// Connect to the MongoDB database using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI, { 

    // Use the useNewUrlParser option to enable the new URL parser
    useNewUrlParser: true, 
    
    // Use the useUnifiedTopology option to enable the new connection topology engine
    useUnifiedTopology: true })

    // Log a success message to the console if the connection is established
    .then(() => console.log('MongoDB connected'))

    // Log an error message to the console if the connection fails
    .catch((err) => console.log(err));

// Set the port number for the application to listen on
const PORT = process.env.PORT || 5000;

// Start the application and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
