import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext'
import UserMostLikedRecipes from '../components/UserMostLikedRecipes';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Profile() {
    const { userID } = useParams()
    const { user } = useUser()

    const [profileUserInfo, setProfileUserInfo] = useState({})
    
    const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

    const navigate = useNavigate()

    if (String(user.id) === userID) {
        navigate("/myprofile")
    }

    const getPublicUserInfo = async () => {
        const url = REACT_APP_BACKEND_URL_BASE + "/getpublicuserinfo/" + userID
        const res = await fetch(url)
        const data = await res.json()
        if (data.status==="ok") {
            setProfileUserInfo(data.data)
        }
    }

    useEffect(()=>{
        getPublicUserInfo()
    },[])

    return (
        <Container>
            <br />
            <Box textAlign="center">
            <Typography variant='h2'>{profileUserInfo.username}'s profile</Typography>
            <br />
            <UserMostLikedRecipes userID={userID} />
            <br />
            </Box>
        </Container>
    )
}
