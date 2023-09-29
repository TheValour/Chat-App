import React, { useContext } from 'react'
import './Navbar.css'

import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { AuthContext } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

export default function Navbar() {
  const {currentUser} = useContext(AuthContext);
  const logOutUser = async () =>{
    const docRef = doc(db, 'user', currentUser.uid);
    await updateDoc(docRef, {
      isLogIn : false
    });
    signOut(auth)
  }
  return (
    <div id='navbar-container' className='flex'>
        <span className="logo"><h2>Hello Chat</h2></span>
        <img src={currentUser.photoURL} alt="img" />
        <h3>{currentUser.displayName}</h3>
        <button onClick={logOutUser}>LogOut</button>
    </div>
  )
}
