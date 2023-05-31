import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout({ logMeOut }) {
    const navigate = useNavigate()

    useEffect(() => {
        logMeOut()
        navigate("/")
    })
    
    return (
        <div>Logout</div>
    )
}
