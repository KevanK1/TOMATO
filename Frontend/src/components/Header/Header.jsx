import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favrourite food here</h2>
            <p>Choose from a diverse menu featuring a delactable array of dishes crafted with the finest ingridients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience.</p>
            <a href='#explore-menu'>View Menu</a>    
                {/* <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a> */}
        </div>
    </div>
  )
}

export default Header