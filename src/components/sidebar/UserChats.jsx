import React, { useContext, useEffect, useState } from 'react'
import './UserChats.css'

import { db } from '../../firebase';
import { doc, getDoc, onSnapshot} from "firebase/firestore";

import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export default function UserChats() {
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  
  const [chats, setChats] = useState([]);

  const getData = async(id) =>{
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data().isLogIn
  }
  
 useEffect(() => {
  const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      const temp = Object.entries(doc.data())?.map((ele) => ele[1]);
      async function updateIsLogInForAllElements() {
        try {
          for (let i = 0; i < temp.length; i++) {
            const element = temp[i];
            const data = await getData(element.userInfo.uid);
            element.userInfo.isLogIn = data;
          }
          // Set the updated temp array in the state after the loop
          setChats(temp);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      }
      updateIsLogInForAllElements();
    });
    return () => {
      unsub();
    };
  };

  currentUser.uid && getChats();
 }, [currentUser.uid]);
  
  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER", payload: u})
  }
  return (
    <div id='usechats-container' >
      {chats && Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        
        <div className={`userChat flex ${chat[1].userInfo.isLogIn?'isOnline':'isOffline'}`} 
          key={chat[1].userInfo.uid} 
          onClick={() => handleSelect(chat[1].userInfo)}
        >
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
