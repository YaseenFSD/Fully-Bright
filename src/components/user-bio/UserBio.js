import { Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import {db, auth} from "../../firebase"

export const UserBio = () => {
    const [currentEmail, setEmail] = useState("")
    
    
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            if (user){
                console.log(user)
                setEmail(user.email)
            }  
        })
        findUserDoc()
        return() => unsubscribe()
        
    })
    
    useEffect(()=>{
    },[])
    
    const findUserDoc = async () => {
        let id
        const collectionRef = await db.collection("users").get()
        collectionRef.forEach((doc)=>{
            console.log(doc.data().email)
            console.log(currentEmail)
            
            if(doc.data().email === currentEmail) {
                id = doc.id
            }        
        })
        console.log(id)
        return id
    }
    
    // use a local state to keep track of what the useBio will be
    const [bio, setBio] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault()

    }

    return (
        <div>

    <form onSubmit={handleSubmit}>
      <label>
        Bio:
        <input
          type="text"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </label>
      <input 
      type="submit"value="Submit" />
    </form>
        </div>
            
            
    )
}

    


    // onSubmit update the bio - .set a bio {merge:true}
    //.set a bio {merge:true} keeps from overwriting




