import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useUser } from '../context/UserContext'
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchByIngredientsCard from '../components/SearchByIngredientsCard';
import Grow from '@mui/material/Grow';

export default function SearchByIngredients() {
  // This is a fake searched recipe that I will be using for design purposes
  // It does not exactly match formatting from API

  const [cardsShown, setCardsShown] = useState(false)
  const [recipeList, setRecipeList] = useState([])
  let haveRecipeResults = recipeList.length === 0

  // Keep temporarily - this is a good practice recipe 
  // const recipe = {
  //   id: 527097,
  //   title: "Green Smoothie",
  //   image: "https://spoonacular.com/recipeImages/527097-312x231.jpg",
  //   imageType: "jpg",
  //   usedIngredientCount: 3,
  //   missedIngredientCount: 2,
  //   missedIngredients: [
  //     "baby spinach",
  //     "ginger"
  //   ],
  //   usedIngredients: [
  //     "banana",
  //     "granny smith apple",
  //     "orange",
  //   ],
  //   unusedIngredients: [
  //     "cheese",
  //   ]
  // }

  const getGrowTime = (i) => (
    200 + (600 * i)
  )
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchIngredients = e.target.search_ingredients.value
    if (!searchIngredients || searchIngredients.trim() === "") {
      return
    }
    const body = {
      search_ingredients: searchIngredients,
    }
    const url = REACT_APP_BACKEND_URL_BASE + "/searchbyingredients"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        // Authorization: `Bearer ${user.apitoken}`
      },
      body: JSON.stringify(body),
    }
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data)
    setCardsShown(false)
    setTimeout(() => {
      setRecipeList(data.data)
      console.log("test")
      setCardsShown(true)
    }, 200)

    // console.log(e)
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
          onSubmit={handleSubmit}
        >
          {/* Search Input Field */}
          <TextField
            required
            label="Enter Ingredients"
            fullWidth
            helperText="List all ingredients separated by commas"
            id="search_ingredients"
          />

          {/* Search Button */}
          <Box textAlign="center">
            <Button color="secondary" variant="outlined" type="submit">
              Search for Recipes
            </Button>
          </Box>
        </Box>
      </Paper>

      <br />

      {
        !cardsShown ?
          <></>
          :
          <Grid container spacing={3} justifyContent="space-around">
            {
              recipeList.map((recipe, i) => (
                <Grow
                  key={i}
                  in={cardsShown}
                  {...(cardsShown ? { timeout: getGrowTime(i) } : {})}
                >
                  <Grid item>
                    <SearchByIngredientsCard recipe={recipe} />
                  </Grid>
                </Grow>
              ))
            }
          </Grid>
      }
      <br />
    </Container>
  )
}
