import React from 'react'
import { NavBar, LoginForm, CreateUserForm } from "../../components"

export function LoginPage() {
    return (
        <div className="LoginPage">
            <NavBar />
            <LoginForm />
            <CreateUserForm />
        </div>
    )
}
