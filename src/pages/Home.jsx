import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import './Home.css'

export default function Home() {
  return (
    <div id='home-container'>
        <Sidebar/>
        <Chat/>
    </div>
  )
}
 