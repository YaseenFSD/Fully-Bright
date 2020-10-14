import React, {useState, useEffect} from 'react'
import {db, auth} from "../../firebase"

export const UserBio = () => {
    const [currentEmail, setEmail] = useState("")
    const [bio, setBio] = useState("")
    
    
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


    return (
        <div>
            
            zzzz...
        </div>
    )
}

