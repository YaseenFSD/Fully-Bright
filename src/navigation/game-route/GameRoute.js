import React from "react"
import { Route } from "react-router-dom"
import {CounterGame} from "../../pages"

export const GameRoute = () => {
    return <Route path="/game/:id" component={CounterGame}/>
}