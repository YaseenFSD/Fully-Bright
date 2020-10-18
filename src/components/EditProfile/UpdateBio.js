import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { auth, db } from "../../firebase/config";



export const UpdateBio = () => {
  const [bio, setBio] = useState("");
  const [user, setUser] = useState(null)

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( (user) => {
      if (user) {
      setUser(user)
      }
    })
    return () => unsubscribe()
  }); 



  const getUserDocId = async (email) => {
    email = email.trim()
    let docId = false
    const usersCollection = await db.collection("users").get()
    usersCollection.forEach((userData) => {
        let foundEmail = userData.data().email
        console.log(foundEmail)
        if (foundEmail.toLowerCase() === user.email) {
            docId = userData.id
        }
    })
    return docId
}

  const handleBio = async (event, error) => {
    event.preventDefault()
    const userDoc = await getUserDocId(user.email)
    db.collection("users").doc(userDoc).set({Bio: bio},{merge:true})
    user.updateProfile({
      Bio: bio,
    }).then(function () {
      alert("Bio updated successfully!");
    })
    .catch(function (error) {});
    
   
  };
  return (
    <div>
      <form noValidate onSubmit={handleBio}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="bio"
          label="Update Bio"
          bio="bio"
          autoFocus
          onChange={(event) => setBio(event.target.value)}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          UPDATE BIO
        </Button>
      </form>
    </div>
  );
};

