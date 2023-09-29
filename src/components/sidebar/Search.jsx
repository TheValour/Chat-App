import React, { useContext, useState } from 'react'
import './Search.css'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

import { db } from '../../firebase';
import { collection, getDocs, query, serverTimestamp, setDoc, updateDoc, where, doc, getDoc } from "firebase/firestore";

export default function Search() {
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState();
  const [flag, setFlag] = useState(false);
  
  const handleSearch = async () =>{
    const userRef = collection(db, "user");
    const q = query(userRef, where("displayName", "==", userName));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
      if(!user) { setFlag(true); }

    }catch(err) {
    }
  }
  const handleKey = (e) =>{
    e.code === 'Enter' && handleSearch();
  }
  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER", payload: u})
  }
  const handleUser = async () => {
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid : user.uid + currentUser.uid;

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
          [combinedId+".date"] : serverTimestamp(),
        })
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp(),
        })
      }
      handleSelect(user)
    }catch(err) {
    }
    setUser(null);
    setFlag(false)
    setUserName("")
  }

  return (
    <div className='search-container'>
        <div className="searchForm flex " >
            <input type="text" placeholder=' 🔍 Find User...'
              onKeyDown={handleKey}
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
        </div>
       {user && <div className="userChat flex" onClick={handleUser}>
            <img src={user.photoURL} alt="" />
            <div className="userCharInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
        {!user && flag && <h4 onClick={() => setFlag(false)}>User not found!</h4>}
    </div>
  )
}
