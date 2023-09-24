import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'

import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';


export default function Message() {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        });

        return () => {
            unSub()
        }
    }, [data.chatId])

    return (
        <div>
            {messages.map((m) =>{
                return(
                    <Messages message={m} key={m.id}/>
                )
            })}
        </div>
    )
}
