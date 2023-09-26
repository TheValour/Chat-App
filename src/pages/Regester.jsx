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
  const [passWeak, setPassWeak] = useState(false);
  const [validEmail, setvalidEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const submitHandler =  async (e) =>{
    setLoading(true);
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      if(password.length < 6) {
        setPassWeak(true)
        throw new Error("Weak password");
      }
      setError(false);
      setvalidEmail('');
      setPassWeak(false);
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
              await setDoc(doc(db, "userChats", res.user.uid), {});
              
              setLoading(false);
              setError(false);
              navigate('/');
            }catch(err) {
              setLoading(false);
              setError(true);
            }
          });
        });
      }catch(err) {
        if(err.code === 'auth/invalid-email') {
          setvalidEmail('Invalid Email');
        }
        if(err.code === 'auth/email-already-in-use'){
          setvalidEmail('Email-already-exist')
        }
        setLoading(false);
        setError(true)
    }    
  }
  
  return (
    <div id='main-register-container' className='flex'>
      <form id='register-container' className='flex' action="" onSubmit={submitHandler}>
        <h2>Chat All</h2>
        <h4>Register</h4>
        <input type="text" placeholder=' name' required/>
        <input type="email" placeholder=' email' required/>
        {validEmail && <div id='error-weak'>{validEmail}</div>}
        <input type="password"  placeholder=' password' required/>
        {passWeak && <div id='error-weak'>Weak password</div>}

        <input type="file"  id='file' style={{display: 'none'}} required/>
        <label htmlFor="file"><img src={fileImg} alt="" />&emsp;<b>Add Profile</b></label>
        <button>Sign Up</button>
        <h5>You have already an account? <b> <Link to='/login'>Login</Link></b></h5>
        {error && <h2>Somthing went wrong</h2>}
        {loading && <h3>Loading ....</h3>}
      </form>
    </div>
  )
}
