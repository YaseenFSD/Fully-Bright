import React from 'react'
import {useSession} from '../../firebase/UserProvider'
import firebase from 'firebase'

// get the currently signed in user 

const user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
} else {
  // No user is signed in.
}




//create user bio 


const UserBio = () => {

    const {user}=useSession()

    if(!user){
        return null
    }
    
    return (
        <div>
            <form>
            <input type="name" type="name"/>
            <input type="email" type="email" value="" id="email"/>
            <input type="city" type="text" value="" id="city"/>
            <input type="age" type="text" value="" id="age"/>
            <input type="leaderboardPosition" type="text" value="" id="leaderboardPosition" />



            <button type="submit">Submit</button>
  


            </form>
            </div>
                
           /* input type= <p>"Name: {user.Name}</p> 
           <p>Display Name:{user.displayName}</p>
           <p>Email:{user.email}</p>
           <p>City:{user.cityName}</p>
           <p>Age:{user.userAge}</p>
           <p>LeaderBoard Position:{user.leaderboardPosition}</p> */
    )
}

export default UserBio;

// lets have Bios include Display Name, Name, City, email
// ability to hide bio info  