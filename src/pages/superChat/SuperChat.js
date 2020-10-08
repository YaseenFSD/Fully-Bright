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
            chat
        </div>
    )
}

export default SuperChat


