import React, { useContext } from 'react'
import './Navbar.css'

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const {currentUser} = useContext(AuthContext);
  
  return (
    <div id='navbar-container' className='flex'>
        <span className="logo"><h2>Hello Chat</h2></span>
        <img src={currentUser.photoURL} alt="img" />
        <h3>{currentUser.displayName}</h3>
        <button onClick={() => signOut(auth)}>LogOut</button>
    </div>
  )
}
