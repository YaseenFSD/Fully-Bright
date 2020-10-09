import React, { useState, Component } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from "../../firebase"
import { useQueryCache } from "react-query"
import { Link, useHistory } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Link as StyleLink} from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Modal from "../create-user-form/Modal";
import { CreateUserForm } from "../create-user-form/CreateUserForm";


const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage:
        "url(https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  

// TODO Create Login form component
export function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const { reset } = useForm()
    const [isLoading, setLoading] = useState(false)
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    
    //TODO Delete this before submission or when nessecary
    const cache = useQueryCache()
    //                  Query key     data
    cache.setQueryData("TestingData", "This is made inside of 'LoginForm.js'")
    //

    const classes = useStyles()

    const handleSignIn = async (event) => {
        event.preventDefault()
        let user
        setLoading(true)
        
        try {
            const userData = await auth.signInWithEmailAndPassword(email, password)
            setMessage("Signed in successful")

            cache.setQueryData("userData", userData)
            const getUserData = JSON.stringify(cache.getQueryData("userData"))
            console.log("getUserData", getUserData)
            window.localStorage.setItem("userDataLocalStorage", getUserData)
            
            console.log(userData)
            
            const user = userData.user
            await user.updateProfile({ displayName: `${email}`})
            // history.push('/profile')
            return user
           
            //return userData.user
        } catch (error) {
            setMessage(error.message)
            return
        }
        finally {
            setLoading(false)
        }
        if (user) {
            props.history.push("/profile")
        } else {
            setLoading(false)
        }

    }

    const formClassName = `ui form ${isLoading ? 'loading' : ''}`

    return (
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EmojiObjectsIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Fully Bright
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignIn}>
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
              onChange={(event) => setEmail(event.target.value)}
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
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  variant="contatined"
                  color="secondary"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Don't have an account? Click here to sign-up!
                </Button>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
               
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <CreateUserForm />
        </Modal>
      </Grid>
    </Grid>
  );
}


