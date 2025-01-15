import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>At Tomato, we are passionate about bringing you the best of local and global cuisine right to your doorstep. Whether you're craving a quick snack or a full-course meal, we ensure fast, reliable, and safe delivery, all while keeping your taste buds satisfied. With a commitment to quality and convenience, Tomato is your go-to partner for food delivery. Let us take care of your cravings – anytime, anywhere. 🍅</p>
                <div className="footer-social-icons">
                <i class="ri-facebook-fill"></i>
                <i class="ri-twitter-x-line"></i>
                <i class="ri-instagram-line"></i>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-7585895495</li>
                    <li>contact@abc.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 @abc.com</p>
    </div>
  )
}

export default Footer