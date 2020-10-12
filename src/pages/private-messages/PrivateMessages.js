import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import { v4 } from "uuid"

export const PrivateMessages = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])
    const getUsers = async () => {
        const users = await db.collection("users").get()
        console.log(users)
        // setUsers(users)
        users.forEach((doc) => {
            console.log(doc.id, doc.data())
            setUsers((users) => {
                return [...users, doc.data()]
            })
        })
    }
    return (
        <div className="privateMessages">
            <ul>
                {users ? users.map((userDoc) => {
                    return (<li key={v4()} >
                        {userDoc.email}

                    </li>)
                }) : null}
            </ul>
        </div>
    )
}