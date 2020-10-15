import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "firebase";

export const UserBio = () => {
  const [bio, setBio] = useState("");
  const user = firebase.auth().currentUser;

  const handleUpdate= (event, error) => {
    event.preventDefault()
    user.updateProfile({
      name: bio,
    }).then(function () {
      alert("Your Bio has been updated!");
    })
    .catch(function (error) {});
    

  };
  return (
    <div>
      <form noValidate onSubmit={handleUpdate}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="bio"
          label="New Bio"
          name="bio"
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

