import React, { useEffect, useState } from "react";
import firebase, { database } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { auth, db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Collections, Email, Score } from "@material-ui/icons";
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export const LeaderBoard = () => {
  // const [userArray, setUserArray] = useState([]);
  // useEffect(() => {
  //   getUsers();
  // }, []);
  // const userArray = []

  const userRef = db.collection("users");
  const query = userRef.orderBy("score", "desc").limit(10);
  const [users] = useCollectionData(query, { idField: "id" });
  
  return (
    <>
      <div className="user-listAllUsers">
        <h1>Users</h1>
        {users && users.map((user) => <UserP key={user.id} user={user} />)}
      </div>
    </>
  );
};

const UserP = (props) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  const { name, score ,email} = props.user;

  return (
    <>
     <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {name}
        </Typography>
       
        <Typography className={classes.pos} color="textSecondary">
         {score}
        </Typography>
        <Typography variant="body2" component="p">
          {email}
          <br />
         
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};
