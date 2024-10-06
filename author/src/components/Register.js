// Import the React library and its useState and useEffect hooks
import React, { useState, useEffect } from 'react';

// Import the axios library, which is used to make HTTP requests
import axios from 'axios';

// Import the useNavigate hook from the react-router-dom library
import { useNavigate } from 'react-router-dom';

// Import the register.css file, which is used to style the component
import "../CssFiles/register.css";

// Define a functional component called Register
const Register = () => {
    // Initialize state variables for the username, password, email, role, and message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

    // Check if the user is already authenticated by checking for a token in local storage
    const isAuthenticated = localStorage.getItem("token");

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate()

    // Use the useEffect hook to perform a side effect when the component mounts
    useEffect(() => {
        // If the user is already authenticated, navigate to the feature-one page
        if (isAuthenticated) {
            return navigate("/feature-one");
        }
        // If the user is not authenticated, navigate to the register page
        else {
            return navigate("/register");
        }
    }, [isAuthenticated, navigate]); // The dependency array includes isAuthenticated and navigate

    // Define a function to handle the register form submission
    const handleRegister = async () => {
        try {
            // Make a POST request to the register endpoint with the username, email, password, and role
            const response = await axios.post('/api/auth/register', { username, email, password, role });

            // Set a success message
            setMessage(response.data.message);

            // Navigate to the login page
            navigate('/login');
        } catch (error) {
            // Set an error message if the registration fails
            setMessage(error.response?.data?.message || "Error registering");
        }
    };

    // Render the component
    return (
        <div className="register">
            <div className="register-inner">
                <div className="register-header">Register</div>

                {/* Input field for the username */}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                {/* Input field for the email */}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                {/* Input field for the password */}
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                {/* Select field for the role */}
                <select className='select' placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                {/* Register button */}
                <button className="btn" onClick={handleRegister}>Register</button>
            </div>

            {/* Display the message */}
            {message && <p>{message}</p>}
        </div>
    );
};

// Export the Register component as the default export
export default Register;