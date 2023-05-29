import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { useUser } from '../context/UserContext'
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchByIngredientsCard from '../components/SearchByIngredientsCard';

export default function SearchByIngredients() {
  // This is a fake searched recipe that I will be using for design purposes
  // It does not exactly match formatting from API
  const recipe = {
    id: 527097,
    title: "Green Smoothie",
    image: "https://spoonacular.com/recipeImages/527097-312x231.jpg",
    imageType: "jpg",
    usedIngredientCount: 3,
    missedIngredientCount: 2,
    missedIngredients: [
      "baby spinach",
      "ginger"
    ],
    usedIngredients: [
      "banana",
      "granny smith apple",
      "orange",
    ],
    unusedIngredients: [
      "cheese",
    ]
  }


  return (
    <Container sx={{ py: 1 }}>
      {/* Search Section */}
      <Paper
        elevation={4}
        sx={{
          p: 1,
          alignItems: "center",
          flexDirection: "column",
          display: "flex"
        }}>

        <Typography variant="h4">Search Recipes By Ingredients</Typography>
        <br /><br />

        {/* Search Form */}
        <Box
          component="form"
          autoComplete="off"
          width="100%"
        >
          {/* Search Input Field */}
          <TextField
            required
            label="Enter Ingredients"
            fullWidth
            helperText="List all ingredients separated by commas"
          />

          {/* Search Button */}
          <Box textAlign="center">
            <Button color="secondary" variant="outlined">
              Search for Recipes
            </Button>
          </Box>
        </Box>
      </Paper>

      <br />
      
      <SearchByIngredientsCard recipe={recipe}/>

      
      <br />
    </Container>
  )
}
