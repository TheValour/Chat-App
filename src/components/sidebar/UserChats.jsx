import React, { useContext, useEffect, useState } from 'react'
import './UserChats.css'

import { db } from '../../firebase';
import { doc, onSnapshot } from "firebase/firestore";

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function UserChats() {
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  
  const [chats, setChats] = useState();

  useEffect(() => {
    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return () =>{
        unsub();
      }
    }

    currentUser.uid && getChats();
  }, [currentUser.uid])
  
  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER", payload: u})
  }
  return (
    <div>
      {chats && Object.entries(chats)?.sort((a,b) => b[1].data - a[1].date).map((chat) => (
        
        <div className="userChat flex" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userCharInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>
      ))}
    </div>
  )
}
