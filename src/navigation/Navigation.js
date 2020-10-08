import React, { useState } from "react"
import { Switch, Route, Redirect, BrowserRouter, useHistory } from "react-router-dom"
import { LoginPage } from "../pages"
import { Profile } from "../pages/profile-page/Profile"
import { UserProvider } from '../firebase/UserProvider'
import { NavBar } from "../components"


export const Navigation = (props) => {
    const history = useHistory()

    return(
        <UserProvider>
            <BrowserRouter>
                <Switch> 
                    {props.isLoggedIn ? <>
                    <NavBar />
                    <Route
                    exact path="/messages">
                        <div>
                            messages
                        </div>
                    </Route>
                    
                    
                    {/* Add your routes here */}
                    
                   

                    <Route exact path="/" component= { Profile }/>
                    </> : <>
                    {history.push("/")}
                    <Route path="/" component= { LoginPage }/>
                    </>
                    }
                   
                    
                    
        
        
        
        
        
                </Switch>
            </BrowserRouter>
        </UserProvider>


    )
}
