import React, { Fragment, useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function Home() {
    const [recipes,setRecipes] = useState([])
    const [maxPageCount, setMaxPageCount] = useState(5)
    const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE
    const viewRecipeUrl = REACT_APP_BACKEND_URL_BASE + "/viewrecipe/"

    const[page, setPage] = useState(1);
    const handlePageChange = async (event, value) => {
        getRecipes(value)
        setPage(value);
    };

    const getRecipes = async (page_num) => {
        const res = await fetch(REACT_APP_BACKEND_URL_BASE + "/gettoprecipes/" + page_num)
        const data = await res.json();
        if (data.status === 'ok') {
            setRecipes(data.data.recipe_list)
            console.log(data)
        }
        setMaxPageCount(data.data.max_pages)
        
    }

    useEffect(()=>{getRecipes(1)},[])
    
    return (
        <Container sx={{textAlign:"center"}}>
            
            
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

            
            
            <br /><br />

            {/* Most Liked Recipes Section */}
            <TableContainer elevation={4} component={Paper}>
                <br />
                <Typography variant='h3'>Most Liked Recipes</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Recipe Title</b></TableCell>
                            <TableCell ><b>Owner Username</b></TableCell>
                            <TableCell sx={{textAlign:"center"}}><b>Likes Count</b></TableCell>
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
                                <TableCell>{recipeInfo.owner_username}</TableCell>
                                <TableCell sx={{textAlign:"center"}}>{recipeInfo.like_count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            <Box display="flex" justifyContent="center" p={2}>
            <Pagination count={maxPageCount} page={page} variant='outlined' color="secondary" onChange={handlePageChange} />
            </Box>
            </TableContainer>

            {/* <Pagination count={10} page={1}/> */}
            <br />

            {/* <Box
                sx={{ backgroundImage:"https://hips.hearstapps.com/hmg-prod/images/delish-202210-padseeew-165-1666972356.jpg?crop=1.00xw:0.752xh;0,0.144xh&resize=1200:*"}}
            >
            </Box> */}
            {/* <img src="https://hips.hearstapps.com/hmg-prod/images/delish-202210-padseeew-165-1666972356.jpg?crop=1.00xw:0.752xh;0,0.144xh&resize=1200:*" alt="" /> */}
            {/* <LinearProgress/> */}
        </Container>
    )
}