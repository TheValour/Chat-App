import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './Search.css'

import { db } from '../../firebase';
import { collection, getDocs, query, serverTimestamp, setDoc, updateDoc, where, doc, getDoc } from "firebase/firestore";

export default function Search() {
  const {currentUser} = useContext(AuthContext);

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

  const handleUser = async () => {
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    console.log(combinedId)
    try{
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: [] });
        
        //creating user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"] : serverTimestamp()
        })
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp()
        })
        
      }
    }catch(err) {

    }
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
       {user && <div className="userChat flex" onClick={handleUser}>
            <img src={user.photoURL} alt="" />
            <div className="userCharInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}
