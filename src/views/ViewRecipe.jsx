import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import LikeButton from '../components/LikeButton'
import NutritionalInfo from '../components/NutritionalInfo'
import RecipeContent from '../components/RecipeContent'
import SpoonacularChip from '../components/SpoonacularChip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function ViewRecipe() {
  const { recipeID } = useParams()
  const { user } = useUser()
  const navigate = useNavigate()

  const [visibleNutritionalInfo, setVisibleNutritionalInfo] = useState(false)
  const [recipeInfo, setRecipeInfo] = useState({})
  let foundRecipe = Object.keys(recipeInfo).length !== 0

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const getRecipeInfo = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/viewrecipe/" + recipeID
    const res = await fetch(url)
    const data = await res.json()

    if (data.status === "ok") {
      const newRecipeInfo = data.recipeInfo
      setRecipeInfo(newRecipeInfo)
    }
  }

  // Starts trying to load recipe info when page loads
  useEffect(() => {
    getRecipeInfo()
  }, [])

  const handleEditRecipe = async () => {
    navigate("/modifyrecipe/" + recipeID)
    return
  }

  const showNutritionalInfo = () => {

    return (
      <>
        {recipeInfo.nutritional_info ?
          <NutritionalInfo
            nutritionalInfo={recipeInfo.nutritional_info}
            servings={recipeInfo.servings}
          />
          :
          <>
          </>
        }
      </>
    )
  }

  const handleShowNutritionalInfo = async () => {
    if (visibleNutritionalInfo) {
      // Nutritional Info was true and set to false
      setVisibleNutritionalInfo(false)
      return
    }

    if (recipeInfo.nutritional_info) {
      // There was nutritional info, and now setting shown to true
      setVisibleNutritionalInfo(true)
      return
    }

    const url = REACT_APP_BACKEND_URL_BASE + "/getnutritionalinfo/" + recipeID
    const res = await fetch(url)
    const data = await res.json()
    if (data.status === "ok") {
      const newRecipeInfo = {
        ...recipeInfo,
        nutritional_info: data.data,
      }
      setRecipeInfo(newRecipeInfo)
      setVisibleNutritionalInfo(true)
    }
  }

  return (
    <Container>
      <br />
      <Paper elevation={4}
        sx={{ alignItems: "center", flexDirection: "column", display: "flex" }}
      >
        {/* Shows if haven't found recipe yet */}
        {!foundRecipe ?
          <Box width="100%" height="300px" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress color="secondary" />
          </Box>
          :
          <>
            {/* Shows once recipe info is found */}

            {/* Chips */}
            <Box width="100%">
              <Box p={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LikeButton recipeID={recipeID} recipeInfo={recipeInfo} />
                  {recipeInfo.spoonacular_id ?
                    <SpoonacularChip />
                    :
                    <></>
                  }
                </Stack>
              </Box>
            </Box>

            {/* This is what displays most recipe content */}
            <RecipeContent recipeInfo={recipeInfo} />

          </>
        }

        {/* Show Edit Recipe Button, but just if the user owns the recipe */}
        {user.id !== recipeInfo.owner_id ?
          <></>
          :
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEditRecipe}
              sx={{ width: "225px" }}
            >
              Edit Recipe
            </Button>
            <br />
          </>
        }
        <Button
          variant="outlined"
          onClick={handleShowNutritionalInfo}
          color="secondary"
          sx={{ width: "225px" }}
        >
          {visibleNutritionalInfo ? "Hide" : "Show"} Nutritional Info
        </Button>
        <br />
        <Collapse in={visibleNutritionalInfo}>
          {showNutritionalInfo()}
        </Collapse>
        <br />

      </Paper>
      <br />
    </Container>
  )
}
