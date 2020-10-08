import React, { useState } from "react"
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import { LoginPage } from "../pages"
import { Profile } from "../pages/profile-page/Profile"
import { UserProvider } from '../firebase/UserProvider'
import { NavBar } from "../components"


export const Navigation = (props) => {
    
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
                    
                    
                    

                   

                    <Route exact path="/" component= { Profile }/>
                    </> : <Route exact path="/" component= { LoginPage }/>
                    }
                   
                    
                    
        
        
        
        
        
                </Switch>
            </BrowserRouter>
        </UserProvider>


    )
}
