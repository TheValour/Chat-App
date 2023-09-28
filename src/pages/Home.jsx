import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import './Home.css'
import Navbar from '../components/sidebar/Navbar'

export default function Home() {
  return (
    <div id='home-container'>
        <Navbar/>
        <Sidebar/>
        <Chat/>
    </div>
  )
}
 