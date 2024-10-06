// Import the React library, which is the foundation for building user interfaces
import React from 'react';

// Import the BrowserRouter, Route, and Routes components from the react-router-dom library
// BrowserRouter is used to enable client-side routing, while Route and Routes are used to define routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import the Register component, which is used to handle user registration
import Register from './components/Register';

// Import the Login component, which is used to handle user login
import Login from './components/Login';

// Import the FeatureOne component, which is a feature available to all users
import FeatureOne from './components/FeatureOne';

// Import the AdminFeatureOne component, which is a feature available only to administrators
import AdminFeatureOne from './components/AdminFeatureOne';

// Import the Navbar component, which is used to display navigation links
import Navbar from './components/Navbar';

// Import the App.css file, which is used to style the application
import './App.css';

// Define the App function component, which is the top-level component of the application
function App() {
    // Return the JSX that defines the application's structure
    return (
        // Use the BrowserRouter component to enable client-side routing
        // Render the Navbar component at the top of the application
        // Use the Routes component to define a collection of routes
        // Define a route for the registration page
        // Define a route for the login page
        // Define a route for the feature-one page
        // Define a route for the admin-feature-one page
        <Router>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/feature-one" element={<FeatureOne />} />
                <Route path="/admin-feature-one" element={<AdminFeatureOne />} />
            </Routes>
        </Router>
    );
}

// Export the App component as the default export
export default App;