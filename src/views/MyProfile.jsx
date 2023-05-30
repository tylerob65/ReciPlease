import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import UserMostLikedRecipes from '../components/UserMostLikedRecipes';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function MyProfile() {
  const { user } = useUser()
  
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  return (
    <Container>
      <br />
      <Box textAlign="center">
        <Typography variant='h2'>{user.username}'s profile</Typography>
        <br />
        <UserMostLikedRecipes userID={user.id}/>
        {/* <br /> */}
        {/* {showUsersRecipes()} */}
        <br />

      </Box>
    </Container>

  )
}
