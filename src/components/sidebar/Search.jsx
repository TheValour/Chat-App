import React, { useState } from 'react'
import './Search.css'

import { db } from '../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  
  const handleSearch = async () =>{
    console.log("Clicked")
    const userRef = collection(db, "user");
    const q = query(userRef, where("displayName", "==", userName));
    

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log(doc.data())
      });

    }catch(err) {
        setError(true);
    }
  }
  const handleKey = (e) =>{
    e.code == 'Enter' && handleSearch();
  }

  return (
    <div className='search-container'>
        <div className="searchForm " >
            <input type="text" placeholder='Find User'
              onKeyDown={handleKey}
              onChange={(e) => setUserName(e.target.value)}
            />
        </div>
        {error && <h4>User not found!</h4>}
       {user && <div className="userChat flex">
            <img src={user.photoURL} alt="" />
            <div className="userCharInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}
