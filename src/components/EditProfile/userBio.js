import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "firebase";

export const userBio = () => {
  const [name, setName] = useState("");
  const user = firebase.auth().currentUser;

  const handleName = (event, error) => {
    event.preventDefault()
    user.updateProfile({
      name: name,
    }).then(function () {
      alert("Your Bio is now updated!");
    })
    .catch(function (error) {});
    


  };
  return (
    <div>
      <form noValidate onSubmit={handleName}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="bio"
          label="Your New Bio Info"
          name="bio"
          autoFocus
          onChange={(event) => setName(event.target.value)}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          UPDATE USER BIO
        </Button>
      </form>
    </div>
  );
};

