import React, { useState } from "react"
import { Switch, Route, Redirect, BrowserRouter, useHistory } from "react-router-dom"
import { LoginPage } from "../pages"
import { Profile } from "../pages/profile-page/Profile"
import { UserProvider } from '../firebase/UserProvider'
import { NavBar } from "../components"
import { NameChange } from "../components/EditProfile/editName"


export const Navigation = (props) => {
    const history = useHistory()

    return (
        <UserProvider>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    {/* {props.isLoggedIn ? <> */}
                    <Route exact path="/">
                        {props.isLoggedIn ? <Profile /> : <LoginPage />}
                    </Route>
                    <Route
                        exact path="/messages">
                        <div>
                            messages
                        </div>
                    </Route>
                 
                    <Route 
                        exact path="/namechange">
                        <NameChange />
                        </Route>


                    {/* Add your routes here */}
              
                    

                    <Route path="*"> Not found </Route>


                    

                </Switch>
            </BrowserRouter>
        </UserProvider>


    )
}
