import React, { useEffect, useState } from 'react'
import { auth,db} from "../../firebase/config";
import { FileUpload } from '../../components/EditProfile/editPhoto'
import { useAuthState } from "react-firebase-hooks/auth";


export function Profile() {
    const [displayName, setDisplayName] = useState("")
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

  
    
    useEffect(() => {
      const  getUserBio = async ()=>{
        const userDoc= await getUserDocId(user.email)
        const userBio= db.collection("users").doc(`${userDoc}`)
        userBio.get().then(function(doc) {
          if (doc.exists) {
            setBio(doc.data().Bio)
            setDisplayName(doc.data().name)
          } else {
              // doc.data() will be undefined in this case
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      })};
      getUserBio()
    }, [])





     
    return (
        <div>
            <p>Name: {displayName}</p>
            <p>Email: {user.email}</p>
            <p>{bio}</p>
       

           <FileUpload />
         
         
        </div>
    )
}

