import React from 'react'
import Square from './Square'

function Board({squares, onClick}) {
    return (
        <div>
            <Square value='1' onclick={()=>onclick('dummy')}/>
            <Square value='2' onclick={()=>onclick('dummy')}/>
            <Square value='3' onclick={()=>onclick('dummy')}/>
            <Square value='4' onclick={()=>onclick('dummy')}/>
            <Square value='5' onclick={()=>onclick('dummy')}/>
            <Square value='6' onclick={()=>onclick('dummy')}/>
            <Square value='7' onclick={()=>onclick('dummy')}/>
            <Square value='8' onclick={()=>onclick('dummy')}/>
            <Square value='9' onclick={()=>onclick('dummy')}/>
            

            
        </div>
    )
}

export default Board
