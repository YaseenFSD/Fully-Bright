import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {db} from '../../firebase'
import {auth} from '../../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useSession } from '../../firebase/UserProvider'





function SuperChat() {
    const [user] = useAuthState(auth)
    console.log(user)

    const messagesRef = db.collection('chat')
    const query =messagesRef.orderBy('createdAt').limit(25)
    const [messages]=useCollectionData(query, {idField: 'id'})
    console.log([messages])
    return (
        <div>
            {messages && messages.map(msg=><ChatMessage key= {msg.id} message={msg}/>)}
        </div>
    )
}
function ChatMessage(props){
    const {text,uid}=props.message
    return(
        <p>{text}</p>
    )
    }

export default SuperChat


