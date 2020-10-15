import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import "./TicGame.css"

export const TicGame = (props) => {
    const [game, setGame] = useState(null)
    const [JSXstring, setJsxString] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    useEffect(() => {
        getRealTimeData()
        // testingUpdateGame()
    }, [])
    useEffect(() => {
        renderBox()
        return () => setJsxString(null)
    })
    const gameRef = db.collection("counterGame").doc(props.gameId)
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
            console.log(snapshot.data().game)
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
        event.persist()
        // console.log(event.currentTarget.dataset.key)
        let dataKey = event.currentTarget.dataset.key
        console.log(game[dataKey])

        if (game[dataKey] !== null) {
            setMessage("That spot is not empty")
            return
        }
        try {
            updateGame(dataKey)
            // for (let key in game){
            //     if 
            // }
            event.currentTarget.classList.add("currentPlayer")
        } catch (error) {

        }
    }

    // let currentKeyIndex = gameKeys[0]
    const renderBox = () => {
        console.log(game)
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
                    return <>{prev}<div className='currentPlayer ticBox' data-key={key} onClick={(event) => handleCheckBox(event)}></div></>
                })
                // return (<div className="currentPlayer ticBox"></div>)
            } else {
                setJsxString((prev) => {
                    return <>{prev}<div className='otherPlayer ticBox' data-key={key} onClick={(event) => handleCheckBox(event)}></div></>
                })
                // return (<div className="otherPlayer ticBox"></div>)
            }
        }
        setLoading(false)
    }
    // console.log(props)
    return (<div className="ticGame">
        {!isLoading ? JSXstring : null}
        {message}
    </div>)
}
{/* {game ? <>{Object.values(game).map(renderBox)}</>: null} */ }