import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {db} from '../../firebase'
import {auth} from '../../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'


const [user] = useAuthState(auth)




function SuperChat() {

    const messagesRef = db.collection('messages')
    const query =messagesRef.orderBy('createdAt').limit(25)
    const [messages]=useCollectionData(query, {idField: 'id'})
    return (
        <div>
            {messages && messages.map(msg=><ChatMessage key= {msg.id} message={msg}/>)}
        </div>
    )
}
function ChatMessage(){
    const {text,uid}=props.message
    return(
        <p>{text}</p>
    )
    }

export default SuperChat


