import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/config";
import firebase, { auth } from "firebase";
import { useQueryCache } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NameChange } from "./editName"
import  Modal  from "../Modal/Modal";
import { PassChange } from "./editPassword"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    width: "auto",
  },
});

export const FileUpload = () => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("")
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [uid, setUid] = useState("");
  const [openModal, setOpenModal] = useState(false)
  const user = firebase.auth().currentUser;
  const cache = useQueryCache();

  useEffect(() => {
    const userData = cache.getQueryData("userData");
    const uniqueId = userData.uid || userData.user.uid;
    setUid(uniqueId);
    console.log(uniqueId);
  });

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault()
    const uploadTask = storage.ref("users/" + uid + "/profile.jpg").put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("users/" + uid + "/profile.jpg")
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            user.updateProfile({
              photoURL: url,
            });
          });
      }
    );
  };

  //  console.log(auth)

  return (
    <div>
      <LinearProgress variant="determinate" value={progress} />
      <br />
      <br />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={url || user.photoURL}
            width="150"
            height="150"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.displayName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {user.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Change Profile Picture</Button>
        </CardActions>
        <Button
                  variant="contatined"
                  color="secondary"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                > 
                  Change Account Details
                </Button>

                <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <NameChange />
          <br />
          <br />

          <PassChange />
        </Modal>
      </Card>
      
    </div>
    
  );
};

// (`images/${image.name}`).put(image);
