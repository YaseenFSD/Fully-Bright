import React, { useState } from "react"
import { Switch, Route, Redirect, BrowserRouter, useHistory } from "react-router-dom"
import { LoginPage, PrivateMessages } from "../pages"
import { Profile } from "../pages/profile-page/Profile"
import { UserProvider } from '../firebase/UserProvider'
import { NavBar } from "../components"
import SuperChat from "../pages/superChat/SuperChat"

import { NameChange } from "../components/EditProfile/editName"
import { GameRoute } from "./game-route"
import { LeaderBoard } from "../pages/leaderboard/Leaderboard"


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
                        exact path="/messages" 
                        component = {PrivateMessages}/>
                        
                    <Route
                        exact path='/chat'
                       component = {SuperChat}>
                    </Route>
                 
                    <Route 
                        exact path="/namechange">
                        <NameChange />
                        </Route>

                    <Route
                        exact path='/leaderboard'
                        component = {LeaderBoard}>
                    </Route>
{/* 
                    <Route
                       exact path="*"
                       component = {NotFound}>
                       </Route> */}
                            
                    <Route path="/"> Not found </Route>

                        <GameRoute/>


                    {/* Add your routes here */}
              
                    



                    

          <Route exact path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};
