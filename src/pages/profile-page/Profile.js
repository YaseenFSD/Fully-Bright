import React, { useEffect, useState } from 'react'
import { auth,db} from "../../firebase/config";
import { FileUpload } from '../../components/EditProfile/editPhoto'
import { UpdateBio } from '../../components/EditProfile/UpdateBio'
import { useAuthState } from "react-firebase-hooks/auth";

import { useSession } from '../../firebase/UserProvider'
import { useQueryCache } from 'react-query'

export function Profile() {
    const [displayName, setDisplayName] = useState("")
    const cache = useQueryCache()
    const [user] = useAuthState(auth);
    // const [user, setUser] = useState(null)
    const [bio,setBio] =useState(null)
    
    const getUserDocId = async (email) => {
      email = email.trim()
      
      let docId = false
      const usersCollection = await db.collection("users").get()
      usersCollection.forEach((userData) => {
          let foundEmail = userData.data().email
          if (foundEmail.toLowerCase() === user.email) {
              docId = userData.id
      
          }
         
      })
      return docId
  }

  

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged( (user) => {
    //       if (user) {
    //       setUser(user)
    //       console.log(user)
    //       }
    //     })
    //     return () => unsubscribe()
    //   });

    // if (!user) {
    //     return null
    // }
    
    useEffect(() => {
      const  getUserBio = async ()=>{
        const userDoc= await getUserDocId(user.email)
        const userBio= db.collection("users").doc(`${userDoc}`)
        console.log(userDoc)
        userBio.get().then(function(doc) {
          if (doc.exists) {
            setBio(doc.data().Bio)
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      })};
      getUserBio()
    }, [])





     
    return (
        <div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>{bio}</p>
       

           <FileUpload />
         
         
        </div>
    )
}

