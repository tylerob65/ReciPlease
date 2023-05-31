import React, { useState } from 'react'
import SearchByIngredientsCard from '../components/SearchByIngredientsCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SearchByIngredients() {
  const [cardsShown, setCardsShown] = useState(false)
  const [recipeList, setRecipeList] = useState([])

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const getGrowTime = (i) => (
    200 + (900 * i)
  )

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
    setCardsShown(false)
    setTimeout(() => {
      setRecipeList(data.data)
      setCardsShown(true)
    }, 200)
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
            <Button color="secondary" variant="outlined" type="submit" sx={{ width: "225px" }}>
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
