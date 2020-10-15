import React, { useEffect, useState } from 'react'
// import { NameChange } from '../../components/EditProfile/editName'
import { FileUpload } from '../../components/EditProfile/editPhoto'
import { UserBio } from '../../components/user-bio'
import { useSession } from '../../firebase/UserProvider'
import { useQueryCache } from 'react-query'

export function Profile() {
    const [displayName, setDisplayName] = useState("")
    const cache = useQueryCache()
    // const [bio, setBio] = useState("")
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




    // const handleSubmit = (evt) => {
    //     evt.preventDefault()

    // }

    
    return (
        <div>
            <p>Name: {user.displayName}</p>
            <p>Email:{user.email}</p>
            <div>

    {/* <form onSubmit={handleSubmit}>
      <label>
        Bio:
        <input
          type="text"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </label>
      <input 
      type="submit"value="Submit" />
    </form> */}
        </div>

        <userBio />
           <FileUpload />
         
         
        </div>
    )
}



// let user = cache.getQueryData("displayName")
