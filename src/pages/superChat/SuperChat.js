import React, { useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSession } from "../../firebase/UserProvider";
import {
  Container,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  Title,
} from "@material-ui/core";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

function SuperChat(props) {
  //get current user
  const [user] = useAuthState(auth);
  console.log(user);
  //used for scroll effect
  const dummy = useRef();
  //get messages from db
  const messagesRef = db.collection("messages");
  //query a list of messages order it by time created and limit the list to 25
  const query = messagesRef.orderBy("createdAt").limit(25);
  //gives acess to use collection data
  const [messages] = useCollectionData(query, { idField: "id" });
  //used for the form to add message
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    //gets the id and photo from the current user
    const { uid, photoURL } = auth.currentUser;
    //add  text, timestamp,id,and user photo to databass
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    //sets form to empty string after submit
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <Container maxWidth="sm">
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Bright Chat
          </Typography>
          <br />
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="button">Avatar</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button"> Display Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="button">Message</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </Container>
        <Container maxWidth="xl">
          <form onSubmit={sendMessage}>
            <TextField
              id="standard-basic"
              label="Brighten Someone's Day!"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Enter message"
            />

            <Button color="primary" type="submit" disabled={!formValue}>
              <EmojiObjectsIcon />
            </Button>
          </form>
        </Container>

        <span ref={dummy}></span>
      </main>
    </>
  );
}
function ChatMessage(props) {
  //response from the database
  const { text, uid, photoURL, displayName } = props.message;
  //adds a class to weather the message was sent or received
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      {/* <TableBody className={`message ${messageClass}`}>
        {/* either the users photo or a picture of a lightbulb */}
      {/* <img src={photoURL || '/lightbulb.png'} />  
      <Avatar alt="user photo" src={photoURL || '/lightbulb.png'} /> 
      <Typography variant="h6" component="h4"
      >{auth.currentUser.displayName}</Typography>
      <p>{text}</p>
    </TableBody> */}
      <TableBody className={`message ${messageClass}`}></TableBody>
      <TableBody>
        <TableRow>
          <TableCell>
            <Avatar alt="user photo" src={photoURL || "/lightbulb.png"} />
          </TableCell>
          <TableCell>
            <Typography variant="caption">
              {auth.currentUser.displayName}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{text}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}

export default SuperChat;
