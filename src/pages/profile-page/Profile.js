import React from 'react'

import {userSession} from '../../firebase/UserProvider'

const Profile = () => {

    const {user}=userSession()

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
