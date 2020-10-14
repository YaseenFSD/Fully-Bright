import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import ReactHtmlParser from 'react-html-parser';
import "./TicGame.css"

export const TicGame = (props) => {
    // const [game, setGame] = useState(null)
    const [string, setString] = useState("")
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        renderBox()
        // testingUpdateGame()
        // getRealTimeData()
    }, [])
    const gameRef = db.collection("counterGame").doc(props.gameId)
    const game = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
    }


    // const getRealTimeData = () => {
    //     gameRef.onSnapshot((snapshot) => {
    //         setGame(snapshot.data().game)
    //         console.log(snapshot.data().game)
    //     })
    // }
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
    const handleCheckBox = async (event) => {
        event.persist()
        console.log(event.currentTarget.dataset.key)
        try {
            // for (let key in game){
            //     if 
            // }
            event.currentTarget.classList.add("currentPlayer")
        } catch (error) {

        }
    }
    // let currentKeyIndex = gameKeys[0]
    const renderBox = () => {

        for (let [key, value] of Object.entries(game)) {
            console.log(value)
            if (!value) {
                setString((prev) => {
                    return prev + "<div className='ticBox' data-key='" + key +  "' onClick={(event) => handleCheckBox(event)}></div>"
                })
                // (<div className="ticBox" data-key="nasdf" onClick={(event) => handleCheckBox(event)}></div>)
            } else if (value === props.currentEmail) {
                setString((prev) => {
                    return prev + `<div className='currentPlayer ticBox' data-key=${key}></div>`
                })
                // return (<div className="currentPlayer ticBox"></div>)
            } else {
                setString((prev) => {
                    return prev + `<div className='otherPlayer ticBox' data-key=${key}></div>`
                })
                // return (<div className="otherPlayer ticBox"></div>)
            }
        }
        setLoading(false)
    }
    console.log(props)
    return (<div className="ticGame">
        {!isLoading ? string : null}
    </div>)
}
{/* {game ? <>{Object.values(game).map(renderBox)}</>: null} */}