import React, { useEffect, useState } from 'react'
import { auth } from "../../firebase/config";
import { FileUpload } from '../../components/EditProfile/editPhoto'
import { UpdateBio } from '../../components/EditProfile/UpdateBio'

import { useSession } from '../../firebase/UserProvider'
import { useQueryCache } from 'react-query'

export function Profile() {
    const [displayName, setDisplayName] = useState("")
    const cache = useQueryCache()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // const userData = cache.getQueryData("userData");
        // const uniqueId = userData.uid || userData.user.uid;
        const unsubscribe = auth.onAuthStateChanged( (user) => {
          if (user) {
          setUser(user)
          console.log(user)
          }
        })
        return () => unsubscribe()
      });

    // const { user } = useSession()

    if (!user) {
        return null
    }

    return (
        <div>

            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>

           
           <FileUpload />
         
         
        </div>
    )
}



// let user = cache.getQueryData("displayName")

