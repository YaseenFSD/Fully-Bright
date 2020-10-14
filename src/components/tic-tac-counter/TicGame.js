import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import "./TicGame.css"

export const TicGame = (props) => {
    const [game, setGame] = useState(null)
    useEffect(() => {
        // testingUpdateGame()
        getRealTimeData()
    }, [])
    const gameRef = db.collection("counterGame").doc(props.gameId)
    // const game = {
    //     "1": null,
    //     "2": null,
    //     "3": null,
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
            console.log(snapshot.data().game)
        })
    }
    // const testingUpdateGame = async () => {
    //     try {
    //         await db.runTransaction(async (t) => {
    //             const doc = await t.get(gameRef)
    //             const placeValues = doc.data().game
    //             t.update(gameRef, {
    //                 game: {
    //                     ...placeValues,
    //                     "3": true
    //                 }
    //             })
    //         })
    //     } catch (error) {

    //     }
    // }
    // console.log(Object.values(game))
    const handleCheckBox = (event) => {
        event.persist()
        console.log(event)
        event.currentTarget.classList.add("currentPlayer")
    }
    // let currentKeyIndex = gameKeys[0]
    const renderBox = (value) => {

        if (!value) {
            return (<div className="ticBox" onClick={(event) => handleCheckBox(event)}></div>)
        } else if (value === props.currentEmail) {
            return (<div className="currentPlayer ticBox"></div>)
        } else {
            return (<div className="otherPlayer ticBox"></div>)
        }
    }
    console.log(props)
    return (<div className="ticGame">
        {game ? <>{Object.values(game).map(renderBox)}</>: null}
    </div>)
}