import React from "react";
import firebase from "firebase";
import { Button } from "@material-ui/core";

export const DeleteUser = () => {
  const user = firebase.auth().currentUser;

  const handleDelete = () => {
    let confirmDel = prompt(
      "Type YES if you'd like to delete your account, otherwise press CANCEL."
    );
    if (confirmDel === "YES") {
      user
        .delete()
        .then(function () {
          alert("User successfully deleted!");
        })
        .catch(function (error) {
          // An error happened.
        });
    }
  };

  return (
    <Button
      type="submit"
      size="small"
      variant="outlined"
      color="secondary"
      onClick={handleDelete}
    >
      DELETE USER
    </Button>
  );
};
