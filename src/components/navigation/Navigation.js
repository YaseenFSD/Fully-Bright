import React from "react"
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import { LoginPage } from "../../pages"
import { CreateUserForm } from "../create-user-form"
import { Profile } from "../../pages/profile-page/Profile"
import ProfileRedirect from "./ProfileRedirect"
import { UserProvider } from '../../firebase/UserProvider'
import PrivateRoute from '../navigation/PrivateRoute'


export const Navigation = () => {
    
    return(
        <UserProvider>
            <BrowserRouter>
                <Switch>
                    <Route
                    exact path="/messages">
                        <div>
                            messages
                        </div>
                    </Route>
                    
                    
                    

                    <ProfileRedirect 
                    exact path="/signup"
                    component= { CreateUserForm }
                    />

                    <PrivateRoute 
                    exact path="/profile/:id"
                    component= { Profile }
                    />

                    <ProfileRedirect
                    exact path="/login"
                    component= { LoginPage }
                    />
                    
                    <Route 
                    exact path="/">
                        <Redirect to="/login" />
                    </Route>
        
        
        
        
        
                </Switch>
            </BrowserRouter>
        </UserProvider>


    )
}