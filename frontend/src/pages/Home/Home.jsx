import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Menu from '../../components/Menu/Menu'
import bg_img from '../../assets/bg_img.jpg'

const Home = () => {
  return (
    <div>
      <div className='home'>
        <Navbar/>
      </div>
      <div className="bg">
        <img src={bg_img} alt="" className='bg-img'/>
      </div>
      <div className="menu">
        <Menu/>
      </div>
    </div>
  )
}

export default Home
