import React from "react"
import { Route } from "react-router-dom"
import {CounterGame} from "../../pages"

export const GameRoute = (props) => {
    return <Route path="/game/:id" component={CounterGame}/>
}