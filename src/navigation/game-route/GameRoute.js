import React from "react"
import { Route } from "react-router-dom"
import {CounterGame, Games} from "../../pages"

export const GameRoute = (props) => {
    return (<>
    <Route path="/games" component ={Games}/>
    <Route path="/game/:id" component={CounterGame}/>
    </>)
}