import React from 'react'
import { useParams } from 'react-router-dom'

export const CounterGame = (props) => {
    const params = useParams()
    return (<div className="counterGame">

        {console.log(params)}
        Hey you are at the right place
    </div>)
}