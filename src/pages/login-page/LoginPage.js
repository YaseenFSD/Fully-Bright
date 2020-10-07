import React from 'react'
import '../../components/nav-bar/style.css'
import { NavBar, LoginForm } from "../../components"


export function LoginPage() {
    return (
        <div className="LoginPage">
            <NavBar />
            <LoginForm />
        </div>
    )
}
