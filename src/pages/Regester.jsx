import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './Login.css'
import './Regester.css'
import fileImg from '../img/addAvatar.png'

import {auth, storage, db} from '../firebase.js'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  
  const submitHandler =  async (e) =>{
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user)

      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try{
              await updateProfile(res.user, {
                displayName: name,
                photoURL : downloadURL
              });
              await setDoc(doc(db, "user", res.user.uid), {
                uid : res.user.uid,
                displayName:name,
                email,
                photoURL : downloadURL
              });
              await setDoc(doc(db, "userChats", res.user.uid),{});
              
              navigate('/');
            }catch(err) {
              setError(true);
            }
          });
        });
    }catch(err) {
      setError(true)
    }    
  }
  
  return (
    <div id='main-login-container' className='flex'>
      <form id='login-container' className='flex' action="" onSubmit={submitHandler}>
        <h2>Chat All</h2>
        <h4>Register</h4>
        <input type="text" placeholder='name'/>
        <input type="email" placeholder='email'/>
        <input type="password"  placeholder='password'/>

        <input type="file"  id='file' style={{display: 'none'}}/>
        <label htmlFor="file"><img src={fileImg} alt="" /> Add Profile</label>
        <button>Sign Up</button>
        <h5>You have already an account?<b> <Link to='/login'>Login</Link></b></h5>
        {error && <h1>Somthing went wrong</h1>}
      </form>
    </div>
  )
}
