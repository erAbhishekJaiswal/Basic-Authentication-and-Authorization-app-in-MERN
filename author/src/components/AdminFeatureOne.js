// Import the React and React Router DOM libraries
import React, { useState, useEffect } from 'react';

// Import the axios library, which is used to make HTTP requests
import axios from 'axios';

// Import the useNavigate function from the react-router-dom library
import { useNavigate } from 'react-router-dom';

// Import the adminfeature.css file
import '../CssFiles/adminfeature.css';

// Define a functional component called AdminFeatureOne
const AdminFeatureOne = () => {
    // Get the value of the 'role' key from the localStorage
    const t = localStorage.getItem('role');

    // Initialize a state variable called 'message' with an initial value of an empty string
    const [message, setMessage] = useState('');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Use the useEffect hook to perform a side effect
    useEffect(() => {
        // Get the value of the 'token' key from the localStorage
        const token = localStorage.getItem('token');

        // Make a GET request to the 'http://localhost:5000/api/features/admin-feature-one' endpoint
        axios.get('http://localhost:5000/api/features/admin-feature-one', {
            // Include the Authorization header with the token in the request
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            // If the request is successful, update the 'message' state with the response data
            setMessage(res.data.message);

            // If the 'role' is not 'admin', navigate to the '/admin-feature-one' route
            if (t !== 'admin') {
                navigate('/admin-feature-one');
            }
        }).catch((err) => {
            // If the request fails, update the 'message' state with the error message
            setMessage(err.response?.data?.message || "Access Denied");
        });
    }, [t, navigate]);

    // Render the component
    return (
        <>
            <div className="adminfeature">
                <h2>Admin Feature One</h2>
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

// Export the AdminFeatureOne component as the default export
export default AdminFeatureOne;