import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/config";
import { auth } from "../../firebase/config";
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
import { DeleteUser } from "./deleteUser"
import { UpdateBio } from '../../components/EditProfile/UpdateBio'


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: 50,
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
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [uid, setUid] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // const user = firebase.auth().currentUser;
  const [user, setUser] = useState(null)
  const cache = useQueryCache();

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // const userData = cache.getQueryData("userData");
    // const uniqueId = userData.uid || userData.user.uid;
    const unsubscribe = auth.onAuthStateChanged( (user) => {
      if (user) {
      setUid(user.uid);
      setUser(user)
      setLoading(false)
      console.log(user)
      }
    })
    return () => unsubscribe()
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

  if (isLoading) {return null}
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
          <input type="file" accept="image/*" onChange={handleChange} />
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
        <DeleteUser />
        <UpdateBio />
      </Card>
    </div>
  );
};

// (`images/${image.name}`).put(image);

