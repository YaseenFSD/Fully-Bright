import React from "react"
import { Switch, Route } from "react-router-dom"
import { LoginPage, CreateUserPage } from "../../pages"
import { CreateUserForm } from "../create-user-form"



export const Navigation = () => {
    
    return(
        <Switch>
            <Route
            exact path="/messages">
                <div>
                    messages
                </div>
            </Route>
            
            
            

            <Route
            exact path="/"
            component= { LoginPage }
            />
            <Route exact path="/signup"
            component= { CreateUserForm }
            />
            

        
        
        
        
        
        
        
        
        </Switch>


    )
}