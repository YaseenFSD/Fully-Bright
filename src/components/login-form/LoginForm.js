import React, { useState } from 'react'
import { auth } from "../../firebase"
import { useQueryCache } from "react-query"

// TODO Create Login form component
export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    
    //TODO Delete this before submission or when nessecary
    const cache = useQueryCache()
    //                  Query key     data
    cache.setQueryData("TestingData", "This is made inside of 'LoginForm.js'")
    //

    const handleSignIn = async (event) => {
        event.preventDefault()
        try {
            const userData = await auth.signInWithEmailAndPassword(email, password)
            setMessage("Signed in successful")
            console.log(userData)

        } catch (error) {
            setMessage(error.message)
            return
        }

    }

    return (
        <div>
            Login here
            <form onSubmit={handleSignIn}>
                <input type="text" onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
                <input type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                <button type="submit">Sign In</button>
            </form>
            <div>{message}</div>
        </div>
    )
}
