import React, { useState, useContext } from 'react'
import './Input.css'
import Img1 from '../../img/attach.png'
import Img3 from '../../img/emojiIcon.jpg'
import Img4 from '../../img/send.png'

import Picker from 'emoji-picker-react';
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

import {v4 as uuid} from 'uuid';
import { db, storage } from '../../firebase'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Input() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  // for emoji ------
  const [flag, setFlag] = useState(false);
  const onEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji)
  };
  const changeFlag = () =>{
    setFlag(pre => !pre);
  }
  // emoji -----------

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext)

  const handleSend = async () => {
    setFlag(false);
    if(text === '') return;
    if(image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed', () => {},
        (error) => {
          // setError(true);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId),{
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                data:Timestamp.now(),
                image:downloadURL
              })
            })
          });
        }
      );
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        })
      })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid),{
        [data.chatId+".lastMessage"]:{
          text
        },
        [data.chatId+".date"]:serverTimestamp()
    })
    await updateDoc(doc(db, "userChats", data.user.uid),{
        [data.chatId+".lastMessage"]:{
          text
        },
        [data.chatId+".date"]:serverTimestamp()
    })
    setText("")
    setImage(null)
  }
  const handleKey = (e) =>{
    console.log(text)
    e.code === 'Enter' && handleSend();
  }

  return (
    <div id='main-input-container'>
      {flag && <Picker onEmojiClick={onEmojiClick} width='47vw' height='30vh'  
        searchDisabled='true' 
        previewConfig={{
          showPreview: false, // Note: 
        }}
      />}

      <div id='input-container' className='flex'>
          <input type="text" placeholder='Type somthing...' 
            onChange={e => setText(e.target.value)} 
            onKeyDown={handleKey}
            value={text}/>
          <div className="send flex">
              <input type="file" style={{display: "none"}} id='file' 
                onChange={e => setImage(e.target.files[0])} 
                />
              <label htmlFor='file'>
                  <img src={Img1} alt="" className='fileIcon'/>
              </label> 

              <img src={Img3} alt="img" onClick={changeFlag} className='emojiIcon'/>
              <img src={Img4} alt="img" onClick={handleSend} className='sendIcon'/>
          </div>
      </div>

    </div>
  )
}
