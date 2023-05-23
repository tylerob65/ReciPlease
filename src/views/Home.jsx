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
import { Link } from 'react-router-dom';

export default function Home() {
    const [recipes,setRecipes] = useState([])
    const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE
    const viewRecipeUrl = REACT_APP_BACKEND_URL_BASE + "/viewrecipe/"


    const getRecipes = async () => {
        const res = await fetch(REACT_APP_BACKEND_URL_BASE + "/getallrecipes")
        const data = await res.json();
        if (data.status === 'ok') {
            setRecipes(data.data)
            console.log(data)
        }
    }

    useEffect(()=>{getRecipes()},[])
    
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Recipe Title</b></TableCell>
                            <TableCell ><b>Owner Username</b></TableCell>
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
                                <TableCell>{recipeInfo.owner_username}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <br />

            {/* <Box
                sx={{ backgroundImage:"https://hips.hearstapps.com/hmg-prod/images/delish-202210-padseeew-165-1666972356.jpg?crop=1.00xw:0.752xh;0,0.144xh&resize=1200:*"}}
            >
            </Box> */}
            {/* <img src="https://hips.hearstapps.com/hmg-prod/images/delish-202210-padseeew-165-1666972356.jpg?crop=1.00xw:0.752xh;0,0.144xh&resize=1200:*" alt="" /> */}

        </Container>
    )
}