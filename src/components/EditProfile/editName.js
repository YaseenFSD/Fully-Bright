import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "firebase";

export const NameChange = () => {
  const [name, setName] = useState("");
  const user = firebase.auth().currentUser;

  const handleName = () => {
    user.updateProfile({
      displayName: name,
    });
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
          submit
        </Button>
      </form>
    </div>
  );
};
