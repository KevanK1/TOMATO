import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import StoreContextProvider from './context/StoreContext'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Account from './pages/Account/Account'



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
        < Route path='/account' element={<Account/>}/>
      </Routes>
    </div>
    <Footer/>
    </StoreContextProvider>
  )
}

export default App

