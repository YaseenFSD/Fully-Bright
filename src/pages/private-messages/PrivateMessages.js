import React, { useEffect, useState, useRef } from "react"
import { useQueryCache } from "react-query"
import { db } from "../../firebase"
import { v4 } from "uuid"

export const PrivateMessages = () => {
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [pickedUser, setPickedUser] = useState("")
    const [sendingText, setSendingText] = useState("")
    const [responseMessage, setResponseMessage] = useState("")
    const [email, setEmail] = useState("")
    const inputEl = useRef(null)
    const cache = useQueryCache()
    useEffect(() => {
        const currentUser = cache.getQueryData("userData")
        console.log(currentUser)
        if (currentUser) {
            setEmail(currentUser.email)
        }
    })
    useEffect(() => {
        const getData = async () => {
            getMessages()
        }
        getData()
    }, [email])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const users = await db.collection("users").get()
        users.forEach((doc) => {
            setUsers((users) => {
                return [...users, doc.data()]
            })
        })
    }

    const pickUser = (event) => {
        setPickedUser(event.target.innerText)

    }
    const handleSubmitMessage = async (event) => {
        event.preventDefault()
        if (sendingText === "") {
            setResponseMessage("Please enter a value")
            return
        }
        db.collection("privateMessages").doc(pickedUser).collection("inbox").doc().set({
            from: email,
            createdAt: new Date(),
            text: sendingText
        })
        setSendingText("")
        inputEl.current.value = ""
        setResponseMessage("Message Sent")
    }

    const getMessages = async () => {
        console.log(email)
        if (email) {
            const messagesData = await db.collection("privateMessages").doc(email).collection("inbox").get()
            messagesData.forEach((doc) => {
                console.log(doc.data())
                setMessages((msgs) => {
                    return [...msgs, doc.data()]
                })
            })
        }


    }

    return (
        <div className="privateMessages">
            <ul>
                {users ? users.map((userDoc) => {
                    return (<li key={v4()} onClick={pickUser}>
                        {userDoc.email}

                    </li>)
                }) : null}

            </ul>
            {pickedUser ? <form onSubmit={handleSubmitMessage}>
                <input ref={inputEl} onChange={(e) => { setSendingText(e.target.value) }} type="text" placeholder={`send to ${pickedUser}`} />
                <button type="submit">Send message</button>
            </form> : null
            }
            {responseMessage}
            <ul>

                {messages ? messages.map((msgDoc) => {
                    return <li key={v4()}>
                        From: {msgDoc.from}
                        <br />
                        message: {msgDoc.text}
                        <br />
                    </li>
                }) : null}
            </ul>
        </div>
    )
}