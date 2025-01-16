import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'; // Correct import for context

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    // Check if the user is logged in by the presence of a token in localStorage
    const checkLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setShowLogoutPopup(false); // Close the popup
        navigate('/'); // Redirect to home page (triggers re-render)
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
            </ul>
            <div className='navbar-right'>
                {/* Cart icon only visible if the user is logged in */}
                {checkLoggedIn() && (
                    <div className='navbar-search-icon'>
                        <Link to='/cart'> <i className="ri-shopping-basket-line"></i></Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    </div>
                )}

                {/* Display sign in or logout button */}
                {checkLoggedIn() ? (
                    <button onClick={() => setShowLogoutPopup(true)}>Logout</button> // Show logout if logged in
                ) : (
                    <button onClick={() => setShowLogin(true)}>Sign in</button> // Show sign in if not logged in
                )}
            </div>

            {/* Logout Popup */}
            {showLogoutPopup && (
                <div className="logout-popup">
                    <p>Are you sure you want to log out? We’ll miss you! 🥺</p>
                    <button onClick={handleLogout}>Yes, Logout</button>
                    <button onClick={() => setShowLogoutPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
