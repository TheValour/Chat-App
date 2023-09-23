import React from 'react'
import './Messages.css'

export default function Messages() {
  return (
    <div id='message-container'>
        <div className="messageInfo">
            <img src="./logo512.png" alt="" />
            <span>Just Now</span>
        </div>
        <div className="messageContent">
            <p>Hello</p>
            <img src="https://wallpaper.dog/large/1007674.jpg" alt="" />
        </div>
    </div>
  )
}
