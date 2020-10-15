import React, { useEffect, useState } from 'react'
// import { NameChange } from '../../components/EditProfile/editName'
import { FileUpload } from '../../components/EditProfile/editPhoto'
import { UserBio } from '../../components/user-bio'
import { useSession } from '../../firebase/UserProvider'
import { useQueryCache } from 'react-query'

export function Profile() {
    const [displayName, setDisplayName] = useState("")
    const cache = useQueryCache()
    useEffect(() => {
        // let cacheDisplayName = cache.getQueryData("displayName")
        let userDisplayName = () => {
            if (cache.getQueryData("userData").displayName) {
                return cache.getQueryData("userData").displayName
            } else if (cache.getQueryData("userData").user) {
                return cache.getQueryData("userData").user.displayName
            }else {
                return cache.getQueryData("displayName")
            }
        }
        setDisplayName(userDisplayName())
    })
    const { user } = useSession()

    if (!user) {
        return null
    }

    return (
        <div>
            <p>Name: {user.displayName}</p>
            <p>Email:{user.email}</p>
            <p>Bio{user.bio}</p>

        <UserBio />
           <FileUpload />
         
         
        </div>
    )
}



// let user = cache.getQueryData("displayName")
