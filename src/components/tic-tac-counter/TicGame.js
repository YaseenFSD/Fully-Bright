import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import "./TicGame.css"

export const TicGame = (props) => {
    const [game, setGame] = useState(null)
    const [JSXstring, setJsxString] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [opponentEmail, setOpponentEmail] = useState("")
    const [currentTurn, setTurn] = useState("")
    useEffect(() => {
        getRealTimeData()
        getOppenentEmail()
        // testingUpdateGame()
    }, [])
    useEffect(() => {
        renderBox()
        return () => setJsxString(null)
    }, [game, currentTurn])
    // useEffect(() => {
    //     console.log(currentTurn)
    // }, [currentTurn])
    const gameRef = db.collection("counterGame").doc(props.gameId)

    const getOppenentEmail = () => {
        gameRef.get().then((doc) => {
            let values = doc.data()
            let result = values.players.find((element) => element !== props.currentEmail)
            // console.log(result)
            setOpponentEmail(result)
        })
    }
    // console.log(otherPlayer)
    // const game = {
    //     "1": true,
    //     "2": null,
    //     "3": "asdf@gmail.com",
    //     "4": null,
    //     "5": null,
    //     "6": null,
    //     "7": null,
    //     "8": null,
    //     "9": null,
    // }


    const getRealTimeData = () => {
        gameRef.onSnapshot((snapshot) => {
            setGame(snapshot.data().game)
            let turnEmail = snapshot.data().currentPlayer
            setTurn(turnEmail)
            // setMessage("")
            // console.log(turnEmail)
            // console.log(currentTurn)
            console.log(snapshot.data().currentPlayer)
        })
    }
    const updateGame = async (dataKey) => {
        // console.log(dataKey)
        try {
            await db.runTransaction(async (t) => {

                const doc = await t.get(gameRef)
                const placeValues = doc.data().game
                const newObj = { game: { ...placeValues } }
                newObj.game[dataKey] = props.currentEmail
                t.update(gameRef, newObj)
            })
            setMessage("")
        } catch (error) {
            setMessage("An error has occured")
        }
    }
    // console.log(Object.values(game))
    const handleCheckBox = async (event) => {
        // event.persist()
        // console.log(event.currentTarget.dataset.key)
        // setTurn()
        if (currentTurn !== props.currentEmail) {
            setMessage(`It's not your turn, please wait or blow up ${currentTurn}'s phone`)
            return
        }
        let dataKey = event.currentTarget.dataset.key
        // console.log(game[dataKey])

        if (game[dataKey] !== null) {
            setMessage("That spot is not empty")
            return
        }
        try {
            updateGame(dataKey)
            //TODO swap turns
            console.log(opponentEmail)
            gameRef.update({currentPlayer: opponentEmail})
            event.currentTarget.classList.add("currentPlayer")
            //TODO check winning condition
            //TODO check tie condition
        } catch (error) {

        }
    }

    // let currentKeyIndex = gameKeys[0]
    const renderBox = () => {
        // console.log(game)
        if (!game) {
            return null
        }
        for (let [key, value] of Object.entries(game)) {
            // console.log(value)
            if (!value) {
                setJsxString((prev) => {
                    return <>{prev}<div className='ticBox' data-key={key} onClick={(event) => handleCheckBox(event)}></div></>
                })
                // (<div className="ticBox" data-key="nasdf" onClick={(event) => handleCheckBox(event)}></div>)
            } else if (value === props.currentEmail) {
                setJsxString((prev) => {
                    return <>{prev}<div className='currentPlayer ticBox' data-key={key} onClick={(event) => handleCheckBox(event)}> X</div></>
                })
                // return (<div className="currentPlayer ticBox"></div>)
            } else {
                setJsxString((prev) => {
                    return <>{prev}<div className='otherPlayer ticBox' data-key={key} onClick={(event) => handleCheckBox(event)}> O</div></>
                })
                // return (<div className="otherPlayer ticBox"></div>)
            }
        }
        setLoading(false)
    }
    // console.log(props)
    return (<div className="ticGame">
        {!isLoading ? JSXstring : null}
        <br />
        {message}
        <br />
        You are X 
        <br/>
        {currentTurn}'s turn
    </div>)
}
{/* {game ? <>{Object.values(game).map(renderBox)}</>: null} */ }