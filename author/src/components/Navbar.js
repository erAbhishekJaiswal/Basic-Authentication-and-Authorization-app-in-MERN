// Import the React library
import React from 'react';

// Import the navbar.css file, which is used to style the component
import '../CssFiles/navbar.css';

// Import the Link and useNavigate components from the react-router-dom library
import { Link, useNavigate } from "react-router-dom";

// Import the useEffect hook from the React library
import { useEffect } from 'react';

// Define a functional component called Navbar
const Navbar = () => {
    // Get the token, role, and username from local storage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Use the useEffect hook to perform a side effect when the component mounts
    useEffect(() => {
        // If there is no token in local storage, navigate to the login page
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]); // The dependency array includes token and navigate

    // Define a function to handle the logout button click
    const handleLogout = () => {
        // Remove the token, role, and username from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');

        // Navigate to the login page
        navigate('/login');
    }

    // Render the component
    return (
        <>
            <div className='nav'>
                <div className="logo">
                    {/* Display the username if it exists, otherwise display "Logo" */}
                    {username ? <h1>{username}</h1> : <h1>Logo</h1>}
                </div>
                <div className="lists">
                    <ul className="list">
                        {/* If the user is an admin, display the admin feature link and the feature-one link */}
                        {role === "admin" ? <><Link to="/admin-feature-one"><li>Admin</li></Link> <Link to="/feature-one"><li>Feature-one</li></Link> </> : null}

                        {/* If the user is a user, display the feature-one link */}
                        {role === "user" ? <Link to="/feature-one"><li>Feature-one</li></Link> : null}

                        {/* If the user is logged in, display the logout link */}
                        {token ? <Link onClick={handleLogout}><li>Logout</li></Link> : 
                        /* If the user is not logged in, display the register and login links */
                        <><Link to="/register"><li>Register</li></Link><Link to={"/login"}><li>Login</li></Link></>}
                    </ul>
                </div>
            </div>
        </>
    );
};

// Export the Navbar component as the default export
export default Navbar;