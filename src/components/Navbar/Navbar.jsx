// import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const[menu,setMenu]=useState("home");
  const[search,setSearch]=useState("false");
  const{getTotalCartAmount,token,setToken}=useContext(StoreContext);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
        <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu==='home'?'active':''}>Home</Link>
            <a href="#food-display"><li onClick={()=>setMenu("menu")} className={menu==='menu'?'active':''}>Menu</li></a>
            {/* <li onClick={()=>setMenu("Mobile-app")} className={menu==='Mobile-app'?'active':''}>Mobile-app</li> */}
           <a href="#footer"><li onClick={()=>setMenu("contact-us")} className={menu==='contact-us'?'active':''}>contact us</li></a> 
        </ul>
        <div className="navbar-right">
        <img onClick={()=>setSearch("true")} className={search==='true'?'search-bar':''} src={assets.search_icon} alt="" />
        {search==='true'?
        <div className='search-input'>
          <input/>
          <img onClick={()=>setSearch("false")}  className={search==='false'?'search-bar':''} src={assets.search_icon} alt="" />
          </div>
          :''}
            <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {(!token)?<button onClick={()=>setShowLogin(true)}>sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
              </div>
              }
            
        </div>
    </div>
  )
}

export default Navbar