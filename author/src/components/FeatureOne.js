// Import the React library and its useState and useEffect hooks
import React, { useState, useEffect } from 'react';

// Import the axios library, which is used to make HTTP requests
import axios from 'axios';

// Import the featureone.css file, which is used to style the component
import "../CssFiles/featureone.css";

// Define a functional component called FeatureOne
const FeatureOne = () => {
    // Initialize a state variable called 'message' with an initial value of an empty string
    const [message, setMessage] = useState('');

    // Use the useEffect hook to perform a side effect when the component mounts
    useEffect(() => {
        // Get the value of the 'token' key from the localStorage
        const token = localStorage.getItem('token');

        // Make a GET request to the 'http://localhost:5000/api/features/feature-one' endpoint
        axios.get('http://localhost:5000/api/features/feature-one', {
            // Include the Authorization header with the token in the request
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            // If the request is successful, update the 'message' state with the response data
            setMessage(res.data.message);
        }).catch((err) => {
            // If the request fails, update the 'message' state with the error message
            setMessage(err.response?.data?.message || "Error");
        });
    }, []); // The empty dependency array means the effect will only run once when the component mounts

    // Render the component
    return (
        <>
            <div className="feature-one">
                <h2>Feature One</h2>
                <p>This is feature one.</p>
                <p>This Access by both User and Admin</p>
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

// Export the FeatureOne component as the default export
export default FeatureOne;