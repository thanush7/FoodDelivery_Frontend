import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Router, Routes,Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/Loginpopup/Loginpopup'
import Cart from './pages/Cart/Cart'
import Order from './pages/PlaceOrder/Order'
import Razorpay from 'razorpay';

const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  
  return (
    <>
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
      
    <div className='app'> 
       <div>
        <Navbar setShowLogin={setShowLogin}/>
        </div>
       
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<Order/>}/>
        </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;