import React from "react"
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
            <div>

            <h1>404</h1>
            <br />
            <p>Page Not Found</p>

            </div>

            <li><Link to="/leaderboard">Leaderboard</Link></li>


    </>

    )
}
