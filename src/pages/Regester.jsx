import React from 'react'
import './Login.css'
import fileImg from '../img/addAvatar.png'

export default function Register() {
  return (
    <div id='main-login-container' className='flex'>
        <div id='login-container' className='flex'>
            <h2>Chat All</h2>
            <h4>Login</h4>
            <input type="text" placeholder='email'/>
            <input type="email"  placeholder='password'/>
            <button>Sign In</button>
            <h5>You don't have account?<b> Register</b></h5>
        </div>
    </div>
  )
}
