import React from 'react'

function Square({value,onCLick}) {

    
    return (
        <button onClick ={onCLick}> {value} </button>
    )
}

export default Square
