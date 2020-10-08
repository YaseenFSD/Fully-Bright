import React from 'react'

import {useSession} from '../../firebase/UserProvider'

const Profile = () => {

    const {user}=useSession()

    if(!user){
        return null
    }
    
    return (
        <div>
           <p>Name: {user.displayName}</p> 
           <p>Email:{user.email}</p>
           
        </div>
    )
}

export default Profile
