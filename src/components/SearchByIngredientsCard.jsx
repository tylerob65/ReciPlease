import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { useUser } from '../context/UserContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function SearchByIngredientsCard({recipe}) {
  
  const makeIngredientsCategories = () => {
    const ingredientCategories = [
      ["Ingredients you have", recipe.usedIngredients],
      ["Ingredients you need", recipe.missedIngredients],
      ["Unused Ingredients", recipe.unusedIngredients],
    ]
    return (
      <>
        {
          ingredientCategories.map(([category, list]) => (
            <Typography key={category} variant="body2">
              <b>{category}: </b>
              {list.length === 0 ?
                <>None</>
                :
                <>{list.join(", ")}</>
              }
            </Typography>
          ))
        }
      </>
    )
  }

  return (
    <Card sx={{ maxWidth: 300,p:1 }} elevation={4}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.image}
        sx={{
          objectFit: "contain",
        }}
      />
      <CardContent sx={{p:1}}>
        {/* Title */}
        <Typography variant="h6">{recipe.title}</Typography>
        {makeIngredientsCategories()}
      
      </CardContent>
      <CardActions disableSpacing={true}>
        <Box width="100%" textAlign="center">
          <Button color="secondary">View Recipe</Button>
        </Box>
        
      </CardActions>

    </Card>
  )
}
