import React from 'react'
import './Sidebar.css'
import Search from './sidebar/Search'
import UserChats from './sidebar/UserChats'

export default function Sidebar() {
  return (
    <div id='sidebar-container'>
      <Search/> 
      <UserChats/>
    </div>
  )
}
