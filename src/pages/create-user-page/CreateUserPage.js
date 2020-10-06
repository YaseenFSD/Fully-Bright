import React from 'react'
import { NavBar, LoginForm, CreateUserForm } from "../../components"

export function CreateUserPage() {
    return (
        <div className="CreateUserPage">
            <NavBar />
            <LoginForm />
            <CreateUserForm />
        </div>
    )
}
