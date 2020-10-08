import React from "react"
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import { LoginPage } from "../pages"
import Profile from "../pages/profile-page/Profile"
import ProfileRedirect from "./ProfileRedirect"
import { UserProvider } from '../firebase/UserProvider'
import PrivateRoute from './PrivateRoute'

export const Navigation = () => {
    
    return(

        <UserProvider>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute
                    exact path="/messages">
                        <div>
                        Navbar
                        <br/>
                        messages
                        </div>
                    </PrivateRoute>
                    
                    
            
            
            

            <Route
            exact path="/"
            component= { LoginPage }
            />


                    <PrivateRoute 
                    exact path="/signup"
                    component= { LoginPage }
                    />

                    <PrivateRoute
                    exact path="/profile"
                    component= { Profile }
                    />

                    <Route
                    exact path="/"
                    component= { LoginPage }
                    />

                    

                </Switch>
            </BrowserRouter>
        </UserProvider>


    )
}
