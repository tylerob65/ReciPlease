import React, { useState, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useUser } from '../context/UserContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  const { user } = useUser()

  const [recipes, setRecipes] = useState([])
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE
  // const viewRecipeUrl = REACT_APP_BACKEND_URL_BASE + "/viewrecipe/"

  // Overall Goal
  // 1. Show user's recipes
  // Show count of likes
  // 2. Show people that user follows
  // 3. Show people that follow the user

  const getUsersRecipes = async () => {
    const headers = { Authorization: `Bearer ${user.apitoken}` }
    console.log(headers)
    const res = await fetch(REACT_APP_BACKEND_URL_BASE + "/getuserrecipes", {
      headers: { Authorization: `Bearer ${user.apitoken}` }
    })
    const data = await res.json();
    if (data.status === 'ok') {
      setRecipes(data.data)
      console.log(data)
    }
  }

  useEffect(() => { getUsersRecipes() }, [])


  const showUsersRecipes = () => {
    if (recipes.length === 0) {
      return (
        <Typography>You have not submitted any recipes yet</Typography>
      )
    }
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell ><b>Recipe Title</b></TableCell>
              <TableCell ><b>Likes</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipeInfo, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Link to={"/viewrecipe/" + recipeInfo.id}>
                    {recipeInfo.title}
                  </Link>
                </TableCell>
                <TableCell>Some Like Amount</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
    )
  }



  return (
    <Container>
      <br />
      <Box textAlign="center">
        <Typography variant='h2'>{user.username}'s profile</Typography>
        <br />
        {showUsersRecipes()}

      </Box>
    </Container>

  )
}
