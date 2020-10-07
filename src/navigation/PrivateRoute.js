import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSession } from '../firebase/UserProvider'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSession()

    return (
        <Route { ...rest } render={(props) => {
            const id = props.match.params.id

            if (!!user && user.id === id) {
                return <Component {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} 
        />
    ) 
}

export default PrivateRoute