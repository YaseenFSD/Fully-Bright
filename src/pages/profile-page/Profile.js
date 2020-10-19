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
        const unsubscribe = auth.onAuthStateChanged( (user) => {
          if (user) {
          setUser(user)
          console.log(user)
          }
        })
        return () => unsubscribe()
      });

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

