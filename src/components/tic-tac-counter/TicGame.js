import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import { RestartTic } from "./RestartTic"
import "./TicGame.css"

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

export const TicGame = (props) => {
    const [game, setGame] = useState(null)
    const [JSXstring, setJsxString] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [opponentEmail, setOpponentEmail] = useState("")
    const [currentTurn, setTurn] = useState("")
    const [gameIsFinished, setGameIsFinsihed] = useState(false)
    useEffect(() => {
        getRealTimeData()
        getOppenentEmail()
        // testingUpdateGame()
    }, [])
    useEffect(() => {
        if (game != null && checkWin(game, props.currentEmail)) {
            setMessage("You Win!")
            setGameIsFinsihed(true)
        } else if (game != null && checkLost(game)) {
            setMessage("You Lose")
            setGameIsFinsihed(true)
        } else if (game != null && checkFinish(game)) {
            setMessage("Game has unfortunately ended in a tie, better luck next time buddy")
            setGameIsFinsihed(true)
        }

        renderBox()
        return () => setJsxString(null)
    }, [game, currentTurn, opponentEmail, gameIsFinished])
    // useEffect(() => {
    //     //     console.log(currentTurn)
    // })
    const gameRef = db.collection("counterGame").doc(props.gameId)

    const getOppenentEmail = async () => {
        gameRef.get().then(async (doc) => {
            let values = doc.data()
            let result = await values.players.find((element) => element !== props.currentEmail)
            // console.log(result)
            setOpponentEmail(result)
        })
    }


    const getRealTimeData = () => {
        gameRef.onSnapshot(async (snapshot) => {
            setGame(snapshot.data().game)
            let turnEmail = await snapshot.data().currentPlayer
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
        } catch (error) {
            setMessage("An error has occured")
        }
    }
    // console.log(Object.values(game))
    const checkWin = (game, email) => {

        // HORIZONTAL WINS
        if (game["1"] === email && game["2"] === email && game["3"] === email) {
            return true
        }
        if (game["4"] === email && game["5"] === email && game["6"] === email) {
            return true
        }
        if (game["7"] === email && game["8"] === email && game["9"] === email) {
            return true
        }

        // VERTICAL WINS
        if (game["1"] === email && game["4"] === email && game["7"] === email) {
            return true
        } if (game["2"] === email && game["5"] === email && game["8"] === email) {
            return true
        } if (game["3"] === email && game["6"] === email && game["9"] === email) {
            return true
        }

        //DIAGNOL WINS

        if (game["1"] === email && game["5"] === email && game["9"] === email) {
            return true
        } if (game["3"] === email && game["5"] === email && game["7"] === email) {
            return true
        }

        return false



    }

    const checkFinish = (game) => {
        let values = Object.values(game)
        return !values.includes(null)
    }

    const handleCheckBox = async (event) => {
        // event.persist()
        // console.log(event.currentTarget.dataset.key)
        // setTurn()
        if (gameIsFinished) {
            return
        }
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
            console.log(opponentEmail)
            gameRef.update({ currentPlayer: opponentEmail })
            event.currentTarget.classList.add("currentPlayer")
            console.log(game)
            // console.log(checkWin(game, props.currentEmail))
            // if (checkWin(game, props.currentEmail)) {
            if (!gameIsFinished) {
                setMessage("")
            }
            // }
        } catch (error) {
            setMessage("An error has occured, try again")
        }
    }

    const checkLost = (game) => {
        if (checkWin(game, opponentEmail)) {
            return true
        }
        return false
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
        <br />
        {/* TODO instead of null, have it display a play again button */}
        {gameIsFinished ? <RestartTic gameRef={gameRef} setMessage={setMessage} setGame={setGameIsFinsihed} /> : <>{currentTurn}'s turn</>}
    </div>)
}
{/* {game ? <>{Object.values(game).map(renderBox)}</>: null} */ }