import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import StoreContextProvider from './context/StoreContext'
import LoginPopup from './components/LoginPopup/LoginPopup'




const App = () => {

  const[showLogin,setShowLogin]=useState(false)
  return (
    <StoreContextProvider>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        < Route path='/' element={<Home/>}/>
        < Route path='/cart' element={<Cart/>}/>
        < Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </StoreContextProvider>
  )
}

export default App
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import StoreContextProvider from "./context/StoreContext";
// import Navbar from "./components/Navbar/Navbar";
// import Home from "./pages/Home/Home";
// import Cart from "./pages/Cart/Cart";
// import Login from "./components/LoginPopup/LoginPopup";

