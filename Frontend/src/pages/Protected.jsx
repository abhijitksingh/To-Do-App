import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {

    const navigate = useNavigate()

    useEffect(() => {
        const isUser = localStorage.getItem("login") || localStorage.getItem("signup")

    if (!isUser) {
        navigate("/login")
    }
    }, [navigate])
    
    return (
        children
    )
}

export default Protected