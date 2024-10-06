// Import the React library and its useState and useEffect hooks
import React, { useState, useEffect } from 'react';

// Import the axios library, which is used to make HTTP requests
import axios from 'axios';

// Import the useNavigate hook from the react-router-dom library
import { useNavigate } from 'react-router-dom';

// Import the login.css file, which is used to style the component
import "../CssFiles/login.css";

// Define a functional component called Login
const Login = () => {
    // Initialize state variables for the username, password, and message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Check if the user is already authenticated by checking for a token in local storage
    const isAuthenticated = localStorage.getItem("token");

    // Use the useEffect hook to perform a side effect when the component mounts
    useEffect(() => {
        // If the user is already authenticated, navigate to the feature-one page
        if (isAuthenticated) {
            return navigate("/feature-one");
        }
        // If the user is not authenticated, navigate to the login page
        else {
            return navigate("/login");
        }
    }, [isAuthenticated, navigate]); // The dependency array includes isAuthenticated and navigate

    // Define a function to handle the login form submission
    const handleLogin = async () => {
        try {
            // Make a POST request to the login endpoint with the username and password
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

            // Store the token, role, and username in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('username', response.data.user.username);

            // Set a success message
            setMessage("Logged in successfully");

            // Navigate to the feature-one page
            navigate('/feature-one');
        } catch (error) {
            // Set an error message if the login fails
            setMessage(error.response?.data?.message || "Error logging in");
        }
    };

    // Render the component
    return (
        <div className="login">
            <div className="login-inner">
                <div className="login-header">Login</div>
                <div className="login-form">
                    {/* Input field for the username */}
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    {/* Input field for the password */}
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {/* Login button */}
                    <button className='btn' onClick={handleLogin}>Login</button>
                </div>
            </div>
            {/* Display the message */}
            {message && <p>{message}</p>}
        </div>
    );
};

// Export the Login component as the default export
export default Login;