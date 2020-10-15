
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { LoginPage } from '../../pages';
import  Modal  from '../Modal/Modal'
import  SuperChat  from '../../pages/superChat/SuperChat'




const useStyles = makeStyles((theme) => ({

    link: {
      margin: theme.spacing(1, 1.5),
    },
    

  }));
  

// TODO Create nav bar component here
export function SignedInLinks() {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
  return (
   
    
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Games
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Leaderboard
            </Link>
            <Button 
             variant="button" color="textPrimary" className={classes.link}  onClick={() => {
              setOpenModal(true);
            }}
          > Chat
            </Button>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
              <SuperChat />
            </Modal>
            <Link variant="button" color="textPrimary" href="/messages" className={classes.link}>
              Messages
            </Link>
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Profile
            </Link>
            <Link variant="button" color="textPrimary" href="/users" className={classes.link}>
              Users
            </Link>
          </nav>

  );
}
