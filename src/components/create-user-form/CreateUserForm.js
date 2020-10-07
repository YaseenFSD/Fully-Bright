import React, { useState } from 'react'
import { auth, db } from "../../firebase"
import { useQueryCache } from "react-query"


// THIS IS HOW IT IS WRITTEN INSIDE OF ../../firebase
// const auth = firebase.auth()
// const db = firebase.firestore()


//TODO make a user form compononent
export function CreateUserForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirm] = useState("")
    const [message, setMessage] = useState("")

    //TODO: delete this before submission or when necessary 
    // React Query Sync Data Example 
    const cache = useQueryCache()
    //                                   This is the key of the Query (made inside of LoginForm.js)
    let testingData = cache.getQueryData("TestingData")
    console.log("Console.log from 'CreateUserForm.js:", testingData)
    //
    const handleCreateUser = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }
        setMessage("")
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            setMessage("User has been created")

        } catch (error) {
            setMessage(error.message)

        }
        // console.log(data)

    }
    return (
        <div>
            Create User Here
            <form onSubmit={handleCreateUser}>
                <input type="text" onChange={(event) => setEmail(event.target.value)} placeholder="email" />
                <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="password" />
                <input type="password" onChange={(event) => setConfirm(event.target.value)} placeholder="Confirm Password" />
                <button type="submit">Create User</button>
            </form>
            <div>{message}</div>
        </div>
    )
}
