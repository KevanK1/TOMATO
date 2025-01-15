// import React, { useState, useContext, useEffect } from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/assets';
// import { Link } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext'; // Correct import for context

// const Navbar = ({ setShowLogin }) => {
//     const [menu, setMenu] = useState("menu");
//     const { getTotalCartAmount } = useContext(StoreContext);

//     // State to track if the user is logged in
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     // Check if the user is logged in by the presence of a token in localStorage
//     const checkLoggedIn = () => {
//         return localStorage.getItem('token') !== null;
//     };

//     // Handle logout
//     const handleLogout = () => {
//         localStorage.removeItem('token');  // Remove token from localStorage
//         setIsLoggedIn(false);  // Update the isLoggedIn state
//     };

//     // Handle login status change on component mount
//     useEffect(() => {
//         setIsLoggedIn(checkLoggedIn()); // Set login status based on token in localStorage
//     }, []);

//     return (
//         <div className='navbar'>
//             <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
//             <ul className='navbar-menu'>
//                 <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
//                 <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
//                 <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
//                 <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact-us</a>
//             </ul>
//             <div className='navbar-right'>
//                 {/* Cart icon only visible if the user is logged in */}
//                 {isLoggedIn && (
//                     <div className='navbar-search-icon'>
//                         <Link to='/cart'> <i className="ri-shopping-basket-line"></i></Link>
//                         <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//                     </div>
//                 )}

//                 {/* Display sign in or logout button */}
//                 {isLoggedIn ? (
//                     <button onClick={handleLogout}>Logout</button> // Show logout if logged in
//                 ) : (
//                     <button onClick={() => setShowLogin(true)}>Sign in</button> // Show sign in if not logged in
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Navbar;


import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);

  // Check if the user is logged in by the presence of a token in localStorage
  const checkLoggedIn = () => {
    return localStorage.getItem('token') !== null;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setIsLoggedIn(false); // Update local state after logout
  };

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact-us
        </a>
      </ul>
      <div className="navbar-right">
        {isLoggedIn && (
          <div className="navbar-search-icon">
            <Link to="/cart">
              <i className="ri-shopping-basket-line"></i>
            </Link>
            {/* Add a notification dot for cart */}
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        )}

        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
