import React, { useRef, useEffect, useState } from "react"
import randomstring from "randomstring"
import { auth, db } from "../../firebase"
import { useHistory } from "react-router-dom"

const randomFiveChars = () => randomstring.generate(5)

// TODO let the current user choose a game and invite the email they want to play with
export const Games = () => {
    const [email, setEmail] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setLoading] = useState(true)
    const [invitee, setInvitee] = useState("")
    const [message, setMessage] = useState("")
    const [randomCharacters, setRandomCharacters] = useState(randomFiveChars())
    const history = useHistory()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email)
                setLoading(false)
            }
        })
    })
    const getUserDocId = async (email) => {
        email = email.trim()
        let id = false
        const usersCollection = await db.collection("users").get()
        usersCollection.forEach((user) => {
            // console.log(user.data().email)
            if (user.data().email === email) {
                id = user.id
            }
        })
        return id
    }

    const createGameDoc = async (inviteeEmail, loggedInUserEmail) => {
        let result = await db.collection("counterGame").doc(randomCharacters).get()
        // console.log(result.exists)
        while (result.exists) {
            setRandomCharacters(randomFiveChars())
            result = await db.collection("counterGame").doc(randomCharacters).get()
        }
        db.collection("counterGame").doc(randomCharacters).set({
            players: [inviteeEmail, loggedInUserEmail]
        })
        console.log(randomCharacters)
    }

    const handleCounterInvite = async (event) => {
        event.preventDefault()
        // console.log()
        setMessage("")
        if (!invitee) {
            setMessage("Please enter a valid email")
            return
        }
        const docId = await getUserDocId(invitee)
        if (!docId) {
            setMessage("Email is not found")
            return
        }
        // console.log(window.location.host)
        createGameDoc(email, invitee)
        setMessage(`Game has been created`)
        setUrl(`/game/${randomCharacters}`)
        // console.log(inviteeDoc.data())
    }
    return (<div className="gamesPage">
        render games to invite here

        <div className="counterInvite">
            <form onSubmit={handleCounterInvite}>
                Counter game <br />
                Invite to <input onChange={(e) => setInvitee(e.target.value)} type="text" placeholder="email" />
                <button type="submit">Invite!</button>
            </form>
        </div>
        {message} <br />
        {url ? <a style={{color:"blue", cursor:"pointer"}} onClick={() => { history.push(url) }} >{window.location.host + url}</a> : null}
    </div>)
}