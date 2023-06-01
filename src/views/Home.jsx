import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import HomeCarousel from '../components/HomeCarousel';

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [topUsers, setTopUsers] = useState([])
  const [maxPageCountRecipes, setMaxPageCountRecipes] = useState(5)
  const [maxPageCountTopUsers, setMaxPageCountTopUsers] = useState(5)
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const [mostLikesPage, setMostLikesPage] = useState(1);
  const [topUserPage, setTopUserPage] = useState(1);
  const handleMostLikesPageChange = async (event, value) => {
    getRecipes(value)
    setMostLikesPage(value);
  };

  const handleTopUsersPageChange = async (event,value) => {
    getTopUsers(value)
    setTopUserPage(value)
  }

  const getRecipes = async (page_num) => {
    const res = await fetch(REACT_APP_BACKEND_URL_BASE + "/gettoprecipes/" + page_num)
    const data = await res.json();
    if (data.status === 'ok') {
      setRecipes(data.data.recipe_list)
    }
    setMaxPageCountRecipes(data.data.max_pages)
  }

  const getTopUsers = async (page_num) => {
    const res = await fetch(REACT_APP_BACKEND_URL_BASE + "/getusersbyrecipecount/" + page_num)
    const data = await res.json();
    if (data.status === 'ok') {
      setTopUsers(data.data.user_list)
    }
    setMaxPageCountTopUsers(data.data.max_pages)
  }

  useEffect(() => { getRecipes(1);getTopUsers(1) }, [])

  return (
    <Container sx={{ textAlign: "center" }}>

      {/* Welcome Text */}
      <Typography
        color="secondary"
        component="h1"
        sx={{
          fontFamily: 'Pacifico,cursive',
          fontSize: "3.5rem"
        }}
      >
        Welcome
      </Typography>

      <br />
      
      <HomeCarousel />
      <br /><br />

      {/* Most Liked Recipes Section */}
      <TableContainer elevation={4} component={Paper}>
        <br />
        <Typography variant='h3'>Most Liked Recipes</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell ><Typography><b>Recipe Title</b></Typography></TableCell>
              <TableCell ><Typography><b>Owner Username</b></Typography></TableCell>
              <TableCell sx={{ textAlign: "center" }}><Typography><b>Likes Count</b></Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipeInfo, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Link to={"/viewrecipe/" + recipeInfo.recipe_id}>
                    <Typography variant="a" color="secondary" sx={{ textDecoration: "underline" }}>
                      {recipeInfo.recipe_title}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={"/profile/" + recipeInfo.owner_id}>
                    <Typography variant="a" color="secondary" sx={{ textDecoration: "underline" }}>
                      {recipeInfo.owner_username}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography>{recipeInfo.like_count}</Typography>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" p={2}>
          <Pagination count={maxPageCountRecipes} page={mostLikesPage} variant='outlined' color="secondary" onChange={handleMostLikesPageChange} />
        </Box>
      </TableContainer>
      <br />
      <br />

      {/* Users With Most Recipes */}
      <TableContainer elevation={4} component={Paper}>
        <br />
        <Typography variant='h3'>Top Users</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ textAlign: "center" }}><b>User</b></Typography>
                </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography><b>Recipe Count</b></Typography>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topUsers.map((topUserInfo,i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ textAlign: "center" }}>
                  <Link to={"/profile/" + topUserInfo.user_id}>
                    <Typography variant="a" color="secondary" sx={{ textDecoration: "underline" }}>
                      {topUserInfo.username}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography>{topUserInfo.recipe_count}</Typography>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" p={2}>
          <Pagination count={maxPageCountTopUsers} page={topUserPage} variant='outlined' color="secondary" onChange={handleTopUsersPageChange} />
        </Box>
      </TableContainer>




      <br />
    </Container>
  )
}