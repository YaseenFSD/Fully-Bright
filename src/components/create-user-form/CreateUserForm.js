import React, { useState } from 'react'
import { auth, db } from "../../firebase"
import { useQueryCache } from "react-query"
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";



// THIS IS HOW IT IS WRITTEN INSIDE OF ../../firebase
// const auth = firebase.auth()
// const db = firebase.firestore()

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



//TODO make a user form compononent
export function CreateUserForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirm] = useState("")
  const [message, setMessage] = useState("")
  const [typedDisplayName, setDisplayName] = useState("")
  const classes = useStyles();


  // React Query Sync Data Example 
  const cache = useQueryCache()
  const handleCreateUser = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }
    setMessage("")
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      db.collection("users").doc().set({
        email,
        name: typedDisplayName,
        score: 0
      })
      cache.setQueryData("displayName", typedDisplayName)
      auth.currentUser.updateProfile({ displayName: `${typedDisplayName}` })
      setMessage("User has been created")

    } catch (error) {
      setMessage(error.message)

    }
  }




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
          </Typography>
        <form className={classes.form} noValidate onSubmit={handleCreateUser}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)} placeholder="Email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
         
            onChange={(event) => setDisplayName(event.target.value)} placeholder="Display Name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)} placeholder="Password"

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            onChange={(event) => setConfirm(event.target.value)} placeholder="Confirm Password"

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up!
            </Button>
        </form>
      </div>
      <Box mt={8}>
        <h1>{message}</h1>
      </Box>
    </Container>
  )
}
