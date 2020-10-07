import React from 'react'
import '../../components/nav-bar/style.css'
import { NavBar, LoginForm, CreateUserForm } from "../../components"


export function LoginPage() {
    return (
        <div className="LoginPage">
            <LoginForm />
            <CreateUserForm />
        </div>
    )
}
