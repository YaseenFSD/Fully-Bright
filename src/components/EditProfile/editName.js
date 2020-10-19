import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
// import firebase from "firebase";
import { auth } from "../../firebase"

export const NameChange = () => {
  const [name, setName] = useState("");
  const user = auth.currentUser;

  const handleName = (event, error) => {
    event.preventDefault()
    user.updateProfile({
      displayName: name,
    }).then(function () {
      alert("Display name successfully changed!");
    })
      .catch(function (error) { });



  };
  return (
    <div>
      <form noValidate onSubmit={handleName}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="New Display Name"
          name="name"
          autoFocus
          onChange={(event) => setName(event.target.value)}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          CHANGE DISPLAY NAME
        </Button>
      </form>
    </div>
  );
};

