import React from 'react'
import { useUser } from '../context/UserContext'
import UserMostLikedRecipes from '../components/UserMostLikedRecipes';
import UserLikedRecipes from '../components/UserLikedRecipes';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function MyProfile() {
  const { user } = useUser()

  return (
    <Container>
      <br />
      <Box textAlign="center">
        <Typography variant='h2'>{user.username}'s profile</Typography>
        <br />
        <UserMostLikedRecipes userID={user.id} />
        <br />
        <UserLikedRecipes userID={user.id} />
        <br />

      </Box>
    </Container>

  )
}
