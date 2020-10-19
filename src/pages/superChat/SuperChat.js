import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useQueryCache } from "react-query";
import { v4 as uuid } from "uuid";
import {
  Typography,
  Table,
  TableCell,
  TableBody,
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Container,
  TextField,
  Grid,
} from "@material-ui/core";
import { ThumbUp, EmojiObjects } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  alignClass: {
    textAlign: "center",
    justifyContent: "center",
  },
  labelLike: {
    float: "right",
  },
}));

function SuperChat() {
  const classes = useStyles();
  const cache = useQueryCache();
  const userData = cache.getQueryData("userData");
  const dummy = useRef(null);
  const messagesRef = db.collection("messages");

  //query a list of messages order it by time created and limit the list to 25
  const query = messagesRef.orderBy("createdAt").limitToLast(25);

  //gives acess to use collection data
  const [messages] = useCollectionData(query, { idField: "id" });
  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

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
      messageUser: userData.displayName,
      post_id: uuid(),
      count: 0,
      userLikes: [],
    });
    //sets form to empty string after submit
    setFormValue("");
  };

  return (
    <Container size="xs" className={classes.alignClass}>
      <Typography variant="h3">Bright Chat</Typography>
      <br />

      <Table justifyContent="center" size="xs">
        {messages &&
          messages.map((msg) => (
            <>
              <ChatMessage key={msg.id} message={msg} />
              <LikeChat
                post={msg.post_id}
                user={msg.uid}
                id={msg.id}
                count={msg.count}
                likes={msg.userLikes}
              />
            </>
          ))}
      </Table>
      <span ref={dummy}></span>
      <br />

      <form onSubmit={sendMessage}>
        <TextField
          large
          variant="outlined"
          label="Enter message"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Brighten Someone's Day!"
        />

        <Button type="submit" disabled={!formValue}>
          <EmojiObjects align="right" float="right" fontSize="large" />
        </Button>
      </form>
    </Container>
  );
}
function ChatMessage(props) {
  const cache = useQueryCache();
  const userData = cache.getQueryData("userData");
  //response from the database
  const { text, uid, photoURL, messageUser, count } = props.message;
  //adds a class to weather the message was sent or received
  const messageClass = uid === userData.uid ? "sent" : "received";
  return (
    <div>
      <Grid justify="center" container spacing={5}>
        <TableBody className={`message ${messageClass}`}>
          {/* either the users photo or a picture of a lightbulb */}
          <TableCell>
            <Avatar src={photoURL || "/lightbulb.png"} />
          </TableCell>
          <TableCell textAlign="center" float="left">
            <Typography variant="button">{messageUser}</Typography>
          </TableCell>
          <TableCell textAlign="center" align="center">
            <strong>{text}</strong>
          </TableCell>
          <TableCell align="right">
            <Typography variant="caption">Likes: {count}</Typography>
          </TableCell>
        </TableBody>
      </Grid>
    </div>
  );
}
function LikeChat(props) {
  const classes = useStyles();

  const cache = useQueryCache();
  const userData = cache.getQueryData("userData");
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);
  const ref2 = db.collection("messages");
  const messagesRef = db.collection("messages").doc(`${props.id}`);
  let userLike = [];
  const query = ref2.where("userLikes", "array-contains", `${userData.email}`);
  query.get().then((snapshot) => {
    snapshot.docs.map((doc) => {
      userLike.push(doc.id);
    });
  });
  const handleLike = (e, id) => {
    const alreadyLiked = userLike.includes(id);
    if (alreadyLiked === false) {
      messagesRef.update({
        count: increment,
        userLikes: firebase.firestore.FieldValue.arrayUnion(userData.email),
      });
    } else if (alreadyLiked === true) {
      messagesRef.update({
        count: decrement,
        userLikes: firebase.firestore.FieldValue.arrayRemove(userData.email),
      });
    }
  };
  return (
    <div>
      <IconButton
        className={classes.likeButton}
        aria-label="like"
        onClick={(e) => handleLike(e, props.id)}
      >
        <ThumbUp fontSize="small" />
      </IconButton>
    </div>
  );
}
export default SuperChat;
