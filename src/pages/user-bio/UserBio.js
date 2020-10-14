// user bio needs
// user bio needs to be able to pull
// the logged in profile
// add a bio form to be filled out
// info added to firebase database
// rendered onto the page 

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

// query and event listener 

document.getElementById('updatebio').addEventListener('submit', formSubmit);

//Submit form
function formSubmit(e) {
    e.preventDefault();
    // Get Values from the DOM
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let city = document.querySelector('#city').value;
    let age = document.querySelector('#age').value;
    let leaderboardPosition = document.querySelector('#leaderboardPosition').value;
    let interest = document.querySelector('#interest').value;

}

document.getElementById('updatebioform').reset();
let formMessage = firebase.database().ref('updatebio');



//Send Message to Firebase(4)
function sendMessage(name, email, city, age, leaderboardPosition, interest) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
      name: name,
      email: email,
      city: city,
      age: age,
      leaderboardPosition: leaderboardPosition,
      Interest: interest
    });
    //send message values
    sendMessage(name, email, city, age, leaderboardPosition, interest);
}





const UserBio = () => {

    const {user}=useSession()

    if(!user){
        return null
    }
    
    // return (
    //     <div>
    //         <form>
    //         <input type="name"type="name"/>
    //         <input type="email"type="email"/>
    //         <input type="city"type="text" />
    //         <input type="age" nbtype="text" />
    //         <input type="leaderboardPosition"type="text" />
    //         <button type="submit">Submit</button>
    //         </form>
    //         </div>
     
           /* input type= <p>"Name: {user.Name}</p> 
           <p>Display Name:{user.displayName}</p>
           <p>Email:{user.email}</p>
           <p>City:{user.cityName}</p>
           <p>Age:{user.userAge}</p>
           <p>LeaderBoard Position:{user.leaderboardPosition}</p> */
}


export default UserBio;

// lets have Bios include Display Name, Name, City, email
// ability to hide bio info  

