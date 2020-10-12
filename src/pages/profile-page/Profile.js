import React from 'react'
// import { NameChange } from '../../components/EditProfile/editName'
import { FileUpload } from '../../components/EditProfile/editPhoto'

import {useSession} from '../../firebase/UserProvider'

export function Profile() {

    const {user}=useSession()

    if(!user){
        return null
    }
    
    return (
        <div>
           <FileUpload />
         
         
        </div>
    )
}

