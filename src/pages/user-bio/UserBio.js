import React from 'react'
import {userSession} from '../../firebase/UserProvider'

const UserBio = () => {

    const {user}=userSession()

    if(!user){
        return null
    }
    
    return (
        <div>
           <p>Name: {user.Name}</p> 
           <p>Display Name:{user.displayName}</p>
           <p>Email:{user.email}</p>
           <p>City:{user.cityName}</p>
           <p>Age:{user.userAge}</p>
           <p>LeaderBoard Position:{user.leaderboardPosition}</p>
           
        </div>
    )
}

export default UserBio;

// lets have Bios include Display Name, Name, City, email
// ability to hide bio info  