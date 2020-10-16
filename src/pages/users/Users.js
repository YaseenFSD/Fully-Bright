import React, { useEffect, useState } from 'react'
import firebase, { database } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {auth, db} from '../../firebase'
import { Collections, Email, Score } from '@material-ui/icons'


export const Users = () => {
  const [userArray, setUserArray] = useState([])
  useEffect(() => {
    getUsers() 
  }, [])
  // const userArray = []
  
  const getUsers = () => {
    db.collection('users').get()
  .then((data) => {
    data.forEach((doc) => {
      setUserArray((previous) => {
        return [...previous, doc.data()]})
      console.log(doc.data())
    })
  })
  }
  return (<>
    <div className="user-listAllUsers">
      <h1>Users</h1>
      {console.log(userArray)}
        {userArray.length > 0 ? userArray.map((user) => {
          console.log(user)
          return (<>
          {/* Don't need prefixes; just put there so that you could see what info goes with each set. */}
          <p>Name: {user.name}</p> 
          <p>Email: {user.email}</p>
          <p>Score: {user.score}</p>
          </>)
        }): null }
    </div>
  </>)
}


  