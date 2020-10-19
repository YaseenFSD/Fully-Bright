import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { auth, db } from "../../firebase/config";

export const NameChange = () => {
  const [name, setName] = useState("");
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


  const handleName = async (event, error) => {
    event.preventDefault()
    const userDoc = await getUserDocId(user.email)
    db.collection("users").doc(userDoc).set({name: name},{merge:true})
    user.updateProfile({
      displayName: name,
      name: name
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

