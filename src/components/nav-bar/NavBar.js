import React from 'react'
import './style.css'
import { signout } from '../../pages/signout-page/Signout'
import { useHistory } from 'react-router-dom'
import { useSession } from '../../firebase/UserProvider'
import { Menu, Button, Header } from 'semantic-ui-react'

// TODO Create nav bar component here
export function NavBar() {
    const history = useHistory();
    const user = useSession();

    const signoutUser = async () => {
        await signout();
        history.push('/login');
    };

    return (
        <Header> 
            <h1>Fully Bright Kapstone</h1>
            {/* {!!user && */}
                <Button  class="ui button logout" onClick={signoutUser}>
                    LOGOUT
                </Button>
        </Header>
                
           
        
    )
}
