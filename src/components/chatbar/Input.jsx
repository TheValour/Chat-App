import React from 'react'
import './Input.css'
import Img1 from '../../img/attach.png'
import Img2 from '../../img/img.png'

export default function Input() {
  return (
    <div id='input-container' className='flex'>
        <input type="text" placeholder='Type somthing...'/>
        <div className="send flex">
            <img src={Img1} alt="" />
            <input type="file" style={{display: "none"}} id='file'/>
            <label htmlFor='file'>
                <img src={Img2} alt="" />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}
