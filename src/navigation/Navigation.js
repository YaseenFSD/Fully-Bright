import React from "react"
<<<<<<< HEAD:src/components/navigation/Navigation.js
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import { LoginPage } from "../../pages"
import { CreateUserForm } from "../create-user-form"
import { Profile } from "../../pages/profile-page/Profile"
import ProfileRedirect from "./ProfileRedirect"
import { UserProvider } from '../../firebase/UserProvider'
import PrivateRoute from '../navigation/PrivateRoute'
=======
import { Switch, Route } from "react-router-dom"
import { LoginPage } from "../pages"

>>>>>>> 567dc23a4eda4bb065d551b259cb0c563e73cf2d:src/navigation/Navigation.js


export const Navigation = () => {
    
    return(
<<<<<<< HEAD:src/components/navigation/Navigation.js
        <UserProvider>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute
                    exact path="/messages">
                        <div>
                            messages
                        </div>
                    </PrivateRoute>
                    
                    
                    
=======
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
            
>>>>>>> 567dc23a4eda4bb065d551b259cb0c563e73cf2d:src/navigation/Navigation.js

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

                    {/* <Route exact path="/">
                        <Redirect to="/profile" />
                    </Route> */}
                    
                    
        
        
        
        
        
                </Switch>
            </BrowserRouter>
        </UserProvider>


    )
}
