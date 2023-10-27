import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import SideImg from '../img/sideImg.jpg'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  
  const submitHandler =  async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password)
    setError(false);
    setLoading(true);
    try{
      const res = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, 'user', res.user.uid);
      await updateDoc(docRef, {
        isLogIn : true
      });
      navigate("/"); 
      setLoading(false)       
    }catch(err) {
      setLoading(false)
      setError(true);
      console.log(err)
    }
  };

  return (
    <div id='main-login-container' className='flex'>
        <img src={SideImg} alt="" />
        <form id='login-container' className='flex' onSubmit={submitHandler}>
            <h2>We Chat</h2>
            <h4>Login</h4>
            {error && <h4 id='error'>Wrong Email or password</h4>}
            <input type="email" placeholder=' email' required/>
            <input type="password"  placeholder=' password' required/>
            <button>Sign In</button>
            <h5>You don't have account? <b><Link to='/register'>Register</Link></b></h5>
            {loading && <h3>📀📀 Loading.... 📀📀</h3>}
        </form>
    </div>
  )
}
