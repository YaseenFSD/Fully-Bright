import React, { useState, Component } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db } from "../../firebase"
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useQueryCache } from "react-query"
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


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
    const { reset } = useForm()
    const [isLoading, setLoading] = useState(false)
    const classes = useStyles();


    const handleCreateUser = async (event) => {
        let newUser
        setLoading(true)
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }
        setMessage("")
        try {
            newUser = await auth.createUserWithEmailAndPassword(email, password)
            setMessage("User has been created")
            
        } catch (error) {
            setMessage(error.message)
            
        }

        if (newUser) {
            props.history.push(`/profile/${newUser.uid}`)
        } else {
            setLoading(false)
        }

    }

    const formClassName = `ui form ${isLoading ? 'loading' : ''}`
    

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

    

