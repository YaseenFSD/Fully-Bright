import React from 'react'
import './style.css'
import { signout } from '../../pages/signout-page/Signout'
import { Link, useHistory } from 'react-router-dom'
import { useSession } from '../../firebase/UserProvider'
import { Menu, Button, Header } from 'semantic-ui-react'
import { auth } from '../../firebase'

// TODO Create nav bar component here
export function NavBar() {
    const history = useHistory();
    const user = useSession();

    const signout = async () => {
        await auth.signOut();
        history.push('/');
    };

    return (
        <Header> 
            <h1>Fully Bright Kapstone</h1>
            {!!user &&
                <Button  class="ui button logout" onClick={signout}>
                    LOGOUT
                </Button>}
        </Header>
                
           
        
    )
}
