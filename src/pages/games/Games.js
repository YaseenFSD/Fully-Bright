import React, { useEffect, useState } from "react"
import randomstring from "randomstring"
import { auth, db } from "../../firebase"
import { useHistory } from "react-router-dom"
import ticTac from "./ticTacToe.png"
import { Button, Card, InputLabel, Input } from "@material-ui/core"

const randomFiveChars = () => randomstring.generate(5)

// TODO let the current user choose a game and invite the email they want to play with
export const Games = () => {
    const [email, setEmail] = useState("")
    const [url, setUrl] = useState("")
    const [invitee, setInvitee] = useState("")
    const [message, setMessage] = useState("")
    const [randomCharacters, setRandomCharacters] = useState(randomFiveChars())
    const history = useHistory()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email)
            }
        })
    })
    const getUserDocId = async (email) => {
        email = email.trim()
        let id = false
        const usersCollection = await db.collection("users").get()
        usersCollection.forEach((user) => {
            if (user.data().email === email) {
                id = user.id
            }
        })
        return id
    }

    const createGameDoc = async (inviteeEmail, loggedInUserEmail) => {
        let result = await db.collection("counterGame").doc(randomCharacters).get()
        while (result.exists) {
            setRandomCharacters(randomFiveChars())
            result = await db.collection("counterGame").doc(randomCharacters).get()
        }
        let playersArray = [inviteeEmail, loggedInUserEmail]
        const randomFirstPlayer = playersArray[Math.floor(Math.random() * 1)]
        db.collection("counterGame").doc(randomCharacters).set({
            currentPlayer: randomFirstPlayer,
            game: {
                "1": null,
                "2": null,
                "3": null,
                "4": null,
                "5": null,
                "6": null,
                "7": null,
                "8": null,
                "9": null,
            },
            players: [inviteeEmail, loggedInUserEmail]
        })
    }

    const handleCounterInvite = async (event) => {
        event.preventDefault()
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
        createGameDoc(email, invitee)
        setMessage(`Game has been created`)
        setUrl(`/game/${randomCharacters}`)
    }
    return (<Card style={{ width: "400px", margin: "0 auto" }} className="gamesPage">
        <img style={{ width: "200px", height: "200px" }} src={ticTac} />

        <div className="counterInvite">
            <form onSubmit={handleCounterInvite}>
                <h2>
                    Tic Tac Toe
                    </h2>
                <br />
                <InputLabel>Invite to</InputLabel>
                <Input onChange={(e) => setInvitee(e.target.value)} type="text" placeholder="email" />
                <Button variant="contained" color="primary" type="submit">Invite!</Button>
            </form>
        </div>
        {message} <br />
        {url ? <a style={{ color: "blue", cursor: "pointer" }} onClick={() => { history.push(url) }} >{window.location.host + url}</a> : null}
    </Card>)
}