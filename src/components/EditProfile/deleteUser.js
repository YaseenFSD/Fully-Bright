import React, { useState, useEffect} from "react";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import { auth, db } from "../../firebase/config";


export const DeleteUser = () => {
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


  const handleDelete = async () => {
    const userDoc = await getUserDocId(user.email)
  

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
          
        })    
        db.collection("users").doc(userDoc)
        .delete()
        .then(function () {

        }).catch(function(error){

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
