import React from 'react'
import './style.css'
import { signout } from '../../pages/signout-page/Signout'
import { useHistory } from 'react-router-dom'
import { useSession } from '../../firebase/UserProvider'
import { auth } from '../../firebase'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { LoginPage } from '../../pages';
import { SignedInLinks } from './SignedInLinks';

import firebase from "firebase"
import { useQueryCache } from 'react-query'


const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },


}));


export function NavBar() {
    const history = useHistory();
    // const user = useSession();
    const classes = useStyles();
    const cache = useQueryCache()
    const user = auth.currentUser;
    if (user) {
        console.log("user is defined: ", user)

        const signout = async () => {
            await auth.signOut();
            window.localStorage.setItem("userDataLocalStorage", null)
            cache.setQueryData("userData", null)

            history.push('/');
        };

        return (
            <div>
                <CssBaseline />
                <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Fully Bright
            </Typography>
                        <SignedInLinks />
                        {!!user &&
                            <Button onClick={signout} color="primary" variant="outlined" className={classes.link}>
                                LOGOUT
            </Button>}
                    </Toolbar>
                </AppBar>

            </div>
        );
    } else {
        return (
            <div>not signed in</div>

        )

    }
}