import React from 'react'

import {useSession} from '../../firebase/UserProvider'

export function Profile() {

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

