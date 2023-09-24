import React, { useContext } from 'react'
import './Navbar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const {currentUser} = useContext(AuthContext);
  return (
    <div id='navbar-container' >
        <span className="logo"><b>Hello Chat</b></span>
        <span className='right'>
            <img src={currentUser.photoURL} alt="img" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)}>LogOut</button>
        </span>
    </div>
  )
}
