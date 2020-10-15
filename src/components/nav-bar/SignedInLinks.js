
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { LoginPage } from '../../pages';




const useStyles = makeStyles((theme) => ({

    link: {
      margin: theme.spacing(1, 1.5),
    },
    

  }));
  

// TODO Create nav bar component here
export function SignedInLinks() {
    const classes = useStyles();
  return (
   
    
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Games
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Leaderboard
            </Link>
            <Link variant="button" color="textPrimary" href="/chat" className={classes.link}>
              Chat
            </Link>
            <Link variant="button" color="textPrimary" href="/messages" className={classes.link}>
              Messages
            </Link>
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Profile
            </Link>
<<<<<<< HEAD
            <Link variant="button" color="textPrimary" href="/user-bio" className={classes.link}>
              User-Bio
=======
            <Link variant="button" color="textPrimary" href="/users" className={classes.link}>
              Users
>>>>>>> f372135c4ebed7c19812d036ccb5a1c3a43d1dd5
            </Link>
          </nav>

  );
}
