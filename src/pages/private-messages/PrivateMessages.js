import React, { useEffect, useState, useRef } from "react";
import { useQueryCache } from "react-query";
import { db } from "../../firebase";
import { v4 } from "uuid";
import {
  Button,
  makeStyles,
  Grid,
  TextField,
  Paper,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 50,
    marginTop: 15,
  },
  paper: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(60),
    marginBottom: theme.spacing(0.5),
  },
  alert: {
    width: "100%",
    "& > * + *": {},
  },
  incoming: {
    padding: theme.spacing(6),
  },
}));

export const PrivateMessages = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pickedUser, setPickedUser] = useState("");
  const [sendingText, setSendingText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const inputEl = useRef();
  const cache = useQueryCache();
  useEffect(() => {
    const currentUser = cache.getQueryData("userData");
    console.log(currentUser);
    if (currentUser) {
      setEmail(currentUser.email);
    }
  });
  useEffect(() => {
    const getData = async () => {
      getMessages();
    };
    getData();
  }, [email]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.scrollIntoView();
    }
  }, [pickedUser]);

  const getUsers = async () => {
    const users = await db.collection("users").get();
    users.forEach((doc) => {
      setUsers((users) => {
        return [...users, doc.data()];
      });
    });
  };

  const pickUser = (event) => {
    setPickedUser(event.target.innerText.toLowerCase());
  };
  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    if (sendingText === "") {
      setResponseMessage(
        <Alert className={alert.classes} severity="error">
          Please enter a message!
        </Alert>
      );
      return;
    }
    db.collection("privateMessages")
      .doc(pickedUser)
      .collection("inbox")
      .doc()
      .set({
        from: email,
        createdAt: new Date(),
        text: sendingText,
      });
    setSendingText("");
    inputEl.current.value = "";
    setResponseMessage(
      <Alert className={alert.classes} severity="success">
        Message sent!
      </Alert>
    );
  };

  const getMessages = async () => {
    console.log(email);
    if (email) {
      const messagesData = await db
        .collection("privateMessages")
        .doc(email)
        .collection("inbox")
        .get();
      messagesData.forEach((doc) => {
        console.log(doc.data());
        setMessages((msgs) => {
          return [...msgs, doc.data()];
        });
      });
    }
  };

  return (
    <div>
      {responseMessage}
      <Grid className={classes.root} container spacing={3}>
        <ul>
          {users
            ? users.map((userDoc) => {
                return (
                  <Paper className={classes.paper} key={v4()}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                      onClick={pickUser}
                    >
                      {userDoc.email}
                    </Button>
                  </Paper>
                );
              })
            : null}
        </ul>

        <Grid item xs={6}>
          <ul>
            {messages
              ? messages.map((msgDoc) => {
                  return (
                    <div>
                      <Paper className={classes.paper} key={v4()}>
                        <Typography variant="overline"> From: </Typography>{" "}
                        <Typography variant="body1">{msgDoc.from}</Typography>
                        <br />
                        <Typography variant="body2">{msgDoc.text} </Typography>
                      </Paper>
                      <br />
                    </div>
                  );
                })
              : null}
          </ul>
        </Grid>

        <Grid className={classes.input} item xs={4}>
          {pickedUser ? (
            <form onSubmit={handleSubmitMessage}>
              <TextField
                fullWidth
                ref={inputEl}
                onChange={(e) => {
                  setSendingText(e.target.value);
                }}
                type="text"
                placeholder={`send to ${pickedUser}`}
              />
              <br />
              <br />
              <Button variant="outlined" color="primary" type="submit">
                Send message
              </Button>
            </form>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
