import React from "react"
import { Switch, Route } from "react-router-dom"
import { LoginPage } from "../pages"



export const Navigation = () => {
    
    return(
        <Switch>
            <Route
            exact path="/messages">
               
                <div>
                    Navbar
                    <br/>
                    messages
                </div>
            </Route>
            
            
            

            <Route
            exact path="/"
            component= { LoginPage }
            />
            

        
        
        
        
        
        
        
        
        </Switch>


    )
}