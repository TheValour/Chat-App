import React from 'react'
import './Sidebar.css'
import Navbar from './sidebar/Navbar'
import Search from './sidebar/Search'
import UserChats from './sidebar/UserChats'

export default function Sidebar() {
  return (
    <div id='sidebar-container'>
      <Navbar/>
      <Search/> 
      <UserChats/>
    </div>
  )
}
