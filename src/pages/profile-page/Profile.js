import React from 'react'
import { FileUpload } from '../../components/Uploader/upload'

import {useSession} from '../../firebase/UserProvider'

export function Profile() {

    const {user}=useSession()

    if(!user){
        return null
    }
    
    return (
        <div>
           <FileUpload />
           <p>Name: {user.displayName}</p> 
           <p>Email:{user.email}</p>
         
        </div>
    )
}

