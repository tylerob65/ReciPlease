import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { Link as MuiLink, List, ListItem } from '@mui/material'
import React, { useState } from 'react'
import { Fragment, useEffect } from 'react'
import { themeOptions } from '../themes/primaryTheme'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useUser } from '../context/UserContext'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom'
import LikeButton from '../components/LikeButton'
import Collapse from '@mui/material/Collapse';
import NutritionalInfo from '../components/NutritionalInfo'
import CircularProgress from '@mui/material/CircularProgress';
import SpoonacularChip from '../components/SpoonacularChip'

export default function ViewRecipe() {

  const { recipeID } = useParams()
  const { user } = useUser()
  const navigate = useNavigate()

  const [visibleNutritionalInfo, setVisibleNutritionalInfo] = useState(false)
  const [recipeInfo, setRecipeInfo] = useState({})
  let foundRecipe = Object.keys(recipeInfo).length !== 0

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const showSteps = () => {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <Typography variant='h5' color="secondary">Instructions</Typography>
        </div>
        {recipeInfo.instructions.map((step, i) => (
          <Fragment key={i}>
            {/* <Typography sx={{fontWeight:"bold", mt:1}} variant="h6"> */}
            <Typography sx={{ mt: 1 }} variant="h6">
              Step {i + 1}
            </Typography>
            <Typography>
              {step}
            </Typography>
          </Fragment>
        ))}
      </>
    )
  }

  const showIngredients = () => {
    return (
      <Grid item>
        <List>
          <ListItem sx={{ justifyContent: "center" }}>
            <Typography variant="h5" color="secondary">Ingredients</Typography>
          </ListItem>

          {recipeInfo.ingredients.map((ingredient, i) =>
          (
            <Fragment key={i}>
              {i !== 0 ? <Divider variant="middle" light /> : ""}
              <ListItem>{ingredient}</ListItem>
            </Fragment>
          )
          )}
        </List>
      </Grid>
    )
  }

  const getRecipeInfo = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/viewrecipe/" + recipeID
    const res = await fetch(url)
    const data = await res.json()
    console.log("recipeinfo", recipeInfo)
    console.log("foundrecipe", foundRecipe)
    if (data.status === "ok") {
      const newRecipeInfo = data.recipeInfo
      console.log(newRecipeInfo)
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
          <NutritionalInfo nutritionalInfo={recipeInfo.nutritional_info} />
          :
          <>
          </>
        }
      </>
    )
  }

  const handleShowNutritionalInfo = async () => {
    if (visibleNutritionalInfo) {
      setVisibleNutritionalInfo(false)
      console.log("Nutritional Info was true and set to false")
      return
    }

    if (recipeInfo.nutritional_info) {
      setVisibleNutritionalInfo(true)
      console.log("There was nutritional info, and now setting shown to true")
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

            {/* Recipe Name, Shared By, Servings, and Cook Time */}
            <Typography variant="h2" mb={1} color="primary" sx={{ textAlign: "center" }}>{recipeInfo.title}</Typography>
            <Typography mt={-1}><small>Shared By: <em>{recipeInfo.owner_username}</em ></small></Typography>
            {recipeInfo.servings ? <Typography mt={-1}><small>Servings: <em>{recipeInfo.servings}</em ></small></Typography> : <></>}
            {recipeInfo.cook_time ? <Typography mt={-1}><small>Cook Time: <em>{recipeInfo.cook_time} mins</em ></small></Typography> : <></>}
            <br />

            <Grid
              container
              alignItems="center"
              justifyContent="space-around"
              alignContent="center"
              maxWidth="md"
              px={4}
            >

              {/* Ingredients and Image Section */}
              <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={recipeInfo.image_url} alt=""
                  style={{ maxHeight: "300px", width: "min(300px,90%)", objectFit: "contain" }}
                />
              </Grid>
              {showIngredients()}
            </Grid>
            <br />
            <br />

            {/* Instructions Section */}
            <Grid container justifyContent="center" px={4}>
              <Box maxWidth="md" flexGrow="1">
                {showSteps()}
                <br /><br />
                <Typography>Source</Typography>
                <MuiLink
                  href={recipeInfo.source_url}
                  target="_blank"
                  rel="noopener"
                  color="themeblack.main"
                >
                  <Typography>{recipeInfo.source_url}</Typography>
                </MuiLink>
                <br />
              </Box>
              <br />
            </Grid>
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
