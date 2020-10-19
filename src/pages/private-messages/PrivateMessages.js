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
    marginLeft: theme.spacing(65),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(1)
    
  },
  alert: {
    width: "100%",
   position: "fixed",
    bottom: 0,
  },
  incoming: {
    padding: theme.spacing(6),
  },
  alertDiv: {
    position: "relative"
  }
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
        <Alert fullWidth severity="error">
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
    if (email) {
      const messagesData = await db
        .collection("privateMessages")
        .doc(email)
        .collection("inbox")
        .get();
      messagesData.forEach((doc) => {
        setMessages((msgs) => {
          return [...msgs, doc.data()];
        });
      });
    }
  };

  return (
    <div>
  
<Grid className={classes.input} item xs={4}>

      <br/>
          {pickedUser ? (
            <form noValidate onSubmit={handleSubmitMessage}>
              <TextField
               variant="outlined"
                fullWidth
                label="Enter message here!"
                inputRef={inputEl}
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
          <div className={classes.alertDiv}>
      {responseMessage}
      </div>
      <br/>
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
    
  
      </Grid>
    </div>
  );
};
