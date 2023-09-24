import React, { useState, useContext } from 'react'
import './Input.css'
import Img1 from '../../img/attach.png'
import Img2 from '../../img/img.png'

import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

import {v4 as uuid} from 'uuid';
import { db, storage } from '../../firebase'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Input() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext)

  const handleSend = async () => {
    if(image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
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

  return (
    <div id='input-container' className='flex'>
        <input type="text" placeholder='Type somthing...' 
          onChange={e => setText(e.target.value)} 
        value={text}/>
        <div className="send flex">
            <img src={Img1} alt="" />
            <input type="file" style={{display: "none"}} id='file' 
              onChange={e => setImage(e.target.files[0])} 
              />

            <label htmlFor='file'>
                <img src={Img2} alt="" />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}
