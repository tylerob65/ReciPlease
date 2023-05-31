import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

export default function UserMostLikedRecipes({ userID }) {
  const [recipes, setRecipes] = useState([])
  const [maxPageCount, setMaxPageCount] = useState(5)
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const [page, setPage] = useState(1);
  const handlePageChange = async (event, value) => {
    getRecipes(value)
    setPage(value);
  };

  const getRecipes = async (page_num) => {
    const url = `${REACT_APP_BACKEND_URL_BASE}/getusertoprecipes/${userID}/${page_num}`
    const res = await fetch(url)
    const data = await res.json();
    if (data.status === 'ok') {
      setRecipes(data.data.recipe_list)
    }
    setMaxPageCount(data.data.max_pages)
  }

  useEffect(() => { getRecipes(1) }, [])
  useEffect(() => { getRecipes(1) }, [userID])

  return (
    <TableContainer elevation={4} component={Paper}>
      <br />
      <Typography variant='h4'>Most Liked Recipes</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Recipe Title</b></TableCell>
            <TableCell sx={{ textAlign: "center" }}><b>Likes Count</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            recipes.map((recipeInfo, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Link to={"/viewrecipe/" + recipeInfo.recipe_id}>
                    <Typography variant="a" color="secondary" sx={{ textDecoration: "underline" }}>
                      {recipeInfo.recipe_title}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{recipeInfo.like_count}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>

      </Table>
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination count={maxPageCount} page={page} variant='outlined' color="secondary" onChange={handlePageChange} />
      </Box>
    </TableContainer>
  )
}
