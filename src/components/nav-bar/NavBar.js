import React from 'react'
import { signout } from "../signout"
import { useHistory } from 'react-router-dom'
import { useSession } from '../../firebase/UserProvider'

// TODO Create nav bar component here
export function NavBar() {
    const history = useHistory();
    const user = useSession();


    return (
        <div>
            Nav bar here
            {!!user && 
            <button className="ui secondary button logout" onClick={signout}>
                LOGOUT
            </button>}
        </div>
    )
}
