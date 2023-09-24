import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  
  const submitHandler =  async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password)
    
    try{
      signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }catch(err) {
      setError(true);
    }    
  }

  return (
    <div id='main-login-container' className='flex'>
        <form id='login-container' className='flex' onSubmit={submitHandler}>
            <h2>Chat All</h2>
            <h4>Login</h4>
            <input type="email" placeholder='email'/>
            <input type="password"  placeholder='password'/>
            <button>Sign In</button>
            <h5>You don't have account?<b><Link to='/register'>Register</Link></b></h5>
            {error && <h1>Somthing went wrong</h1>}
        </form>
    </div>
  )
}
