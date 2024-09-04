import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SellerAd from './pages/SellerAd/SellerAd'
import Announcement from './pages/Announcement/Announcement'
import TestPage from './pages/TestPage/TP'
import { Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sellerad' element={<SellerAd/>} />
        <Route path='/announcement' element={<Announcement/>} />
        <Route path='/testpage' element={<TestPage/>} />



      </Routes>
      
    </div>
  )
}

export default App
