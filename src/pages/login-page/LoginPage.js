import React, { useEffect } from 'react'
import '../../components/nav-bar/style.css'
import { LoginForm } from "../../components"
import { useHistory } from 'react-router-dom'


export function LoginPage() {
    
    return (
        <div className="LoginPage">
            <LoginForm />
        </div>
    )
}
