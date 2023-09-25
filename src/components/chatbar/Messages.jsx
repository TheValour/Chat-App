import React, { useContext, useEffect, useRef } from 'react'
import './Messages.css'

import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';


export default function Messages({message}) {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext)

  console.log(message)
  // const sendTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(message.Timestamp);
  const sendTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(message.Timestamp);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div className={`${message.senderId === currentUser.uid?"user":'sender'}-messages`}  ref={ref}>
        <div className="messageInfo">
            <img src={
              message.senderId === currentUser.uid 
              ? currentUser.photoURL
              :data.user.photoURL
            } 
            alt="" />
            <span>{sendTime}</span>
        </div>
        <div className="messageContent">
            {message.text && <p>{message.text}</p>}
            {message.image && <img src={message.image} alt="" />}
        </div>
    </div>
  )
}
