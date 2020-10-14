import React from 'react'
import firebase, { database } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {auth, db} from '../../firebase'
import { Collections } from '@material-ui/icons'


function listAllUsers() {
  db.collection('users').get()
  .then((data) => {
    data.forEach((doc) => {
      console.log(doc.data())
    })
  })
  return (<>
    <div className="user-listAllUsers">
      <h1>Users</h1>
      <ScrollView>
      <p>{listAllUsers}</p>
      </ScrollView>
    </div>
  </>)
}

  export default listAllUsers


  