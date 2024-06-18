import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
         <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>lorem ipsum is simply dummy text of the printing </p>
                <div className="footer-social-items">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>delivery</li>
                    <li>privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+12345678765</li>
                    <li>vanakamda@gmail.com</li>
                </ul>
            </div>
         </div>
         <hr />
         <p className='footer-copyrights'>copyright</p>
    </div>
  )
}

export default Footer