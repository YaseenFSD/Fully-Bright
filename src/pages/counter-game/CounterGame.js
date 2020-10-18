import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { TicGame } from "../../components"

export const CounterGame = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [isAPlayer, setPlayer] = useState(false)
    const [message, setMessage] = useState("")
    const params = useParams()
    const [email, setEmail] = useState("")
    useEffect(() => {
        checkPlayer()
        let unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email)
            }
            return () => unsubscribe()
        })
    })
    const checkPlayer = async () => {
        const collectionRef = db.collection("counterGame").doc(params.id)
        const doc = await collectionRef.get()

        if (!doc.exists) {
            setPlayer(false)
            setMessage("Url not found")
            setLoading(false)
        } else {
            let players = doc.data().players
            let isCurrentUserAPlayer = players.includes(email)
            if (isCurrentUserAPlayer) {
                setPlayer(true)
                setLoading(false)
            } else {
                setMessage("You do not have access to this game")
            }

        }

    }
    if (isAPlayer && !isLoading) {
        return (<div className="counterGame">
            You are a player and url is found
            <TicGame currentEmail={email} gameId={params.id}/>
        </div>)
    }


    return (<div>
        {message}
    </div>)
}