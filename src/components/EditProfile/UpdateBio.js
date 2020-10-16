import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { auth } from "../../firebase/config";


export const UpdateBio = () => {
  const [bio, setBio] = useState("");
//   const user = firebase.auth().currentUser;

    const [user, setUser] = useState(null)

useEffect(() => {
    // const userData = cache.getQueryData("userData");
    // const uniqueId = userData.uid || userData.user.uid;
    const unsubscribe = auth.onAuthStateChanged( (user) => {
      if (user) {
      setUser(user)
      console.log(user)
      }
    })
    return () => unsubscribe()
  });

  const handleBio = (event, error) => {
    event.preventDefault()
    user.updateProfile({
      Bio: bio,
    }).then(function () {
      alert("Bio updated successfully!");
    })
    .catch(function (error) {});
    
    // firebase.ref.push(event)

    // 

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

