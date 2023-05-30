import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMessage } from '../context/MessageContext'
import { useUser } from '../context/UserContext'
import NutritionalInfo from '../components/NutritionalInfo'
import SpoonacularChip from '../components/SpoonacularChip';
import RecipeContent from '../components/RecipeContent'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function ViewSearchedRecipe() {
  const { spoonacularID } = useParams()
  let { addMessage } = useMessage()

  const navigate = useNavigate()
  const { user } = useUser()

  const [visibleNutritionalInfo, setVisibleNutritionalInfo] = useState(false)

  const [recipeInfo, setRecipeInfo] = useState({})
  let foundRecipe = Object.keys(recipeInfo).length !== 0
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const getRecipeInfo = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/getspoonacularrecipe/" + spoonacularID
    const res = await fetch(url)
    const data = await res.json()
    if (data.message === "recipe already in database") {
      addMessage("Random recipe was already in database", "success")
      navigate("/viewrecipe/" + data.data.recipe_id)
    }
    if (data.status==="ok") {
      setRecipeInfo(data.data)
      return
    }
    addMessage(data.message)
  }

  useEffect(() => {
    getRecipeInfo()
  }, [])

  const showNutritionalInfo = () => {
    return (
      <>
        {recipeInfo.nutritional_info ?
          <NutritionalInfo
            nutritionalInfo={recipeInfo.nutritional_info}
            servings={recipeInfo.servings}
          />
          :
          <></>
        }
      </>
    )
  }

  const handleShowNutritionalInfo = async () => {
    if (visibleNutritionalInfo) {
      setVisibleNutritionalInfo(false)
      // Nutritional Info was true and set to false
      return
    }

    if (recipeInfo.nutritional_info) {
      setVisibleNutritionalInfo(true)
      // There was nutritional info, and now setting shown to true
      return
    }

    const url = REACT_APP_BACKEND_URL_BASE + "/getnutritionalinfospoonacular/" + recipeInfo.spoonacular_id
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

  const handleSaveToReciPlease = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/addspoonacularrecipetodb/" + recipeInfo.spoonacular_id
    const res = await fetch(url)
    const data = await res.json()

    if (data.status === "ok") {
      addMessage("Recipe successfully saved to ReciPlease", "success")
      navigate("/viewrecipe/" + data.data.recipe_id)
    }
  }

  return (
    <Container>
      <br />
      <Paper
        elevation={4}
        sx={{ alignItems: "center", flexDirection: "column", display: "flex" }}
      >
        {
          !foundRecipe ?
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

        {/* Show save recipe button, but only if user is logged in  */}
        {user.id ?
          <>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleSaveToReciPlease}
            >
              Save To ReciPlease
            </Button>
            <br />
          </>
          :
          <></>
        }
        <Button
          variant="outlined"
          onClick={handleShowNutritionalInfo}
          color="secondary"
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
