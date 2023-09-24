import React, { useContext } from 'react'
import './Chat.css'
import Img1 from '../img/cam.png'
import Img2 from '../img/add.png'
import Img3 from '../img/more.png'
import Message from './chatbar/Message'
import Input from './chatbar/Input'
import { ChatContext } from '../context/ChatContext'

export default function Chat() {
  const {data} = useContext(ChatContext);

  return (
    <div id='chat-container'>
      <div className="charInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Img1} alt="" />
          <img src={Img2} alt="" />
          <img src={Img3} alt="" />
        </div>
      </div>
      <div className="messages">
        <Message/>
      </div>
      <Input/>
    </div>
  )
}
