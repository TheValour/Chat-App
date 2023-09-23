import React from 'react'
import './Chat.css'
import Img1 from '../img/cam.png'
import Img2 from '../img/add.png'
import Img3 from '../img/more.png'
import Messages from './chatbar/Messages'
import Input from './chatbar/Input'

export default function Chat() {
  return (
    <div id='chat-container'>
      <div className="charInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={Img1} alt="" />
          <img src={Img2} alt="" />
          <img src={Img3} alt="" />
        </div>
      </div>
      <div className="messages">
        <Messages/>
        <Messages/>
        <Messages/>
      </div>
      <Input/>
    </div>
  )
}
