import React from 'react'
import './UserChats.css'

export default function UserChats() {
  return (
    <div>
        <div className="userChat flex">
            <img src="./logo512.png" alt="" />
            <div className="userCharInfo">
                <span>Bob</span>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}
