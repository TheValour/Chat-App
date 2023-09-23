import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <div id='navbar-container' >
        <span className="logo"><b>Hello Chat</b></span>
        <span className='right'>
            <img src="./logo512.png" alt="img" />
            <span>John</span>
            <button>LogOut</button>
        </span>
    </div>
  )
}
