import { Box, Button, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState, Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMessage } from '../context/MessageContext'
import { useUser } from '../context/UserContext';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate, useParams } from 'react-router-dom'

export default function ModifyRecipe() {
  const { recipeID } = useParams()
  let { addMessage } = useMessage()

  const navigate = useNavigate()

  const { user } = useUser()

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const maxIngredients = 17
  const maxInstructions = 17

  const [instructionsList, setInstructionsList] = useState([""])
  const [ingredientsList, setIngredientsList] = useState([""])
  const [otherRecipeInfo,setOtherRecipeInfo] = useState({
    "recipe_title":"",
    "image_url":"",
    "source_url":"",
    "servings":"",
    "cook_time":"",
  })

  const handleInstructionChange = (e, i) => {
    const newInstructionsList = [...instructionsList]
    newInstructionsList[i] = e.target.value
    setInstructionsList(newInstructionsList)
  }

  const handleIngredientChange = (e, i) => {
    const newIngredientsList = [...ingredientsList]
    newIngredientsList[i] = e.target.value
    setIngredientsList(newIngredientsList)
  }

  const handleOtherRecipeInfoChange = (e,category) => {
    const newOtherRecipeInfo = {...otherRecipeInfo}
    newOtherRecipeInfo[category] = e.target.value
    setOtherRecipeInfo(newOtherRecipeInfo)
  }

  const handleAddInstruction = () => {
    const newInstructionsList = [...instructionsList]
    newInstructionsList.push("")
    setInstructionsList(newInstructionsList)
  }

  const handleAddIngredient = () => {
    const newIngredientsList = [...ingredientsList]
    newIngredientsList.push("")
    setIngredientsList(newIngredientsList)
  }

  const handleRemoveInstruction = () => {
    const newInstructionsList = instructionsList.slice(0, -1)
    setInstructionsList(newInstructionsList)

  }

  const handleRemoveIngredient = () => {
    const newIngredientsList = ingredientsList.slice(0, -1)
    setIngredientsList(newIngredientsList)
  }

  const showInstructionInputs = () => (
    instructionsList.map((instruction, i) => (
      <Fragment key={i}>
        <Typography variant="h6" sx={{ mt: 1 }}>Step {i + 1}</Typography>
        <TextField
          label="Instruction"
          id={"instruction" + i}
          required
          minRows={2}
          multiline
          fullWidth
          value={instruction}
          sx={{ my: 1 }}
          onChange={(e) => handleInstructionChange(e, i)}
        />
      </Fragment>
    ))
  )

  const showIngredientInputs = () => (
    ingredientsList.map((ingredient, i) => (
      <Fragment key={i}>
        <Typography variant="h6" sx={{ mt: 1 }}>Ingredient {i + 1}</Typography>
        <TextField
          label="Ingredient"
          id={"ingredient" + i}
          required
          fullWidth
          value={ingredient}
          sx={{ my: 1 }}
          onChange={(e) => handleIngredientChange(e, i)}
        />
      </Fragment>
    ))
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e)
    // Step is unnecessary
    const ingredients = [...ingredientsList]
    const instructions = [...instructionsList]
    console.log(ingredients)
    console.log(instructions)

    const body = {
      recipeID:recipeID,
      recipe_title: otherRecipeInfo.recipe_title,
      image_url: otherRecipeInfo.image_url,
      source_url: otherRecipeInfo.source_url || null,
      servings: otherRecipeInfo.servings || null,
      cook_time: otherRecipeInfo.cook_time || null,
      ingredients: [...ingredientsList],
      instructions: [...instructionsList],
    }
    console.log("Print Body")
    console.log(body)

    const url = REACT_APP_BACKEND_URL_BASE + "/updaterecipe"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.apitoken}`
      },
      body: JSON.stringify(body),
    }
    console.log(options)

    const res = await fetch(url, options);
    const data = await res.json();
    if (data.status === "ok") {
      navigate(`/viewrecipe/${recipeID}`)
    }

  }

  const loadRecipe = async () => {
    if (!user.apitoken) {
      addMessage("user was not logged in")
      navigate("/")
    }
    const headers = { Authorization: `Bearer ${user.apitoken}` }
    const url = REACT_APP_BACKEND_URL_BASE + "/editrecipe/" + recipeID
    const res = await fetch(url,{headers})
    const data = await res.json()
    if (data.status !== "ok") {
      addMessage(data.message)
      return
    }
     
    setIngredientsList(data.recipeInfo.ingredients)
    setInstructionsList(data.recipeInfo.instructions)
    console.log(data)
    const newOtherRecipeInfo = {
      "recipe_title": data.recipeInfo.title||"",
      "image_url": data.recipeInfo.image_url || "",
      "source_url": data.recipeInfo.source_url || "",
      "servings": data.recipeInfo.servings || "",
      "cook_time": data.recipeInfo.cook_time || "",
    }
    setOtherRecipeInfo(newOtherRecipeInfo)
  }

  useEffect(() => {
    loadRecipe()
  },[])


  return (
    <Container>
      <br />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>

          {/* 
          RECIPE BASICS SECTION
          */}

          <Typography color="primary" variant="h4" mb={1}>Recipe Basics</Typography>
          <TextField label="Recipe Title"
            id="recipe_title"
            value={otherRecipeInfo["recipe_title"]}
            onChange={(e)=>handleOtherRecipeInfoChange(e,"recipe_title")}
            fullWidth
            required
          />
          <br /><br />

          <TextField label="Image URL"
            id="image_url"
            value={otherRecipeInfo["image_url"]}
            onChange={(e) => handleOtherRecipeInfoChange(e, "image_url")}
            required
            fullWidth
          />

          <br /><br />

          <TextField label="Source URL"
            value={otherRecipeInfo["source_url"]}
            onChange={(e) => handleOtherRecipeInfoChange(e, "source_url")}
            id="source_url"
            fullWidth
          />

          <br /><br />

          <Box>
            <TextField
              label="Servings"
              value={otherRecipeInfo["servings"]}
              onChange={(e) => handleOtherRecipeInfoChange(e, "servings")}
              id="servings"
              type="number"
              sx={{ width: "200px", mr: 2, mb: 2 }}
            />

            <TextField
              label="Cook Time"
              value={otherRecipeInfo["cook_time"]}
              onChange={(e) => handleOtherRecipeInfoChange(e, "cook_time")}
              id="cook_time"
              type="number"
              sx={{ width: "200px" }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>mins</InputAdornment>

              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 
          INGREDIENTS SECTION
          */}

          <Typography color="primary" variant="h4" mb={1}>Ingredients</Typography>
          {showIngredientInputs()}

          {/* Ingredients Buttons */}
          <Box textAlign="center">
            <Button sx={{ m: 1, width: "170px" }} variant="outlined" color="success" startIcon={<AddIcon />} onClick={handleAddIngredient} disabled={ingredientsList.length >= maxIngredients}>
              Add New Step
            </Button>

            <Button sx={{ m: 1, width: "170px" }} variant="outlined" color="error" startIcon={<RemoveIcon />} onClick={handleRemoveIngredient} disabled={ingredientsList.length <= 1}>
              Remove Step
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 
          INSTRUCTIONS SECTION
           */}

          <Typography color="primary" variant="h4" mb={1}>Instructions</Typography>
          {showInstructionInputs()}

          {/* Instructions Buttons */}
          <Box textAlign="center">
            <Button sx={{ m: 1, width: "170px" }} variant="outlined" color="success" startIcon={<AddIcon />} onClick={handleAddInstruction} disabled={instructionsList.length >= maxInstructions}>
              Add New Step
            </Button>

            <Button sx={{ m: 1, width: "170px" }} variant="outlined" color="error" startIcon={<RemoveIcon />} onClick={handleRemoveInstruction} disabled={instructionsList.length <= 1}>
              Remove Step
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box textAlign="center">
            <Button type="submit" variant="outlined" color="success">
              Update Recipe
            </Button>
          </Box>


        </Paper> 
      </Box>
      <br />
    </Container>
    
  )
}
