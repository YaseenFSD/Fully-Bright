import React, { useState } from "react"

export const RestartTic = (props) => {
    const [restartMessage, setRestartMessage] = useState(null)

    const restartGame = async () => {
        try {

            await props.gameRef.update({
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
                }
            })
            props.setGame(false)
            props.setMessage("")
            props.setScoreIsIncremented(false)
            localStorage.setItem("isScoreIncremented", "false")
        } catch (error) {
            setRestartMessage(error)
        }


    }

    return (<button className="restartTic" onClick={restartGame} >Play Again {restartMessage}</button>)
}