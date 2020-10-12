import React, { useState, useEffect } from "react";
import { storage } from "../../firebase/config";
import firebase, { auth } from 'firebase';
import { useQueryCache } from 'react-query';




export const FileUpload = () => {
    
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [uid, setUid] = useState("")
    const user = firebase.auth().currentUser
    const cache = useQueryCache()
    

    useEffect(( ) => {
      const userData = cache.getQueryData("userData")
      const uniqueId = userData.uid || userData.user.uid
      setUid(uniqueId)
      console.log(uniqueId)
    })


    

    const handleChange = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
      const uploadTask = storage.ref('users/' + uid + '/profile.jpg').put(image)
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
         () => {
          storage
            .ref('users/' + uid + '/profile.jpg')
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              user.updateProfile({
                photoURL: url
              })
             });
             
         }
      );
    };
    
   
  //  console.log(auth)
  
    return (
      <div>
        <progress value={progress} max="100" />
        <br />
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        {url}
        <br />
        <img src={user.photoURL || "http://via.placeholder.com/300"} alt="placeholder" />
      </div>
    );
  };


  // (`images/${image.name}`).put(image);