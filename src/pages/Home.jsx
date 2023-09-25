import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import './Home.css'
import Profilebar from '../components/Profilebar'

export default function Home() {
  return (
    <div id='home-container'>
        <Profilebar/>
        <Sidebar/>
        <Chat/>
    </div>
  )
}
 