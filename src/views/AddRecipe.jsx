import React, { useState, Fragment } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function AddRecipe() {

  const { user } = useUser()

  const navigate = useNavigate()

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const maxIngredients = 20
  const maxInstructions = 20

  const [instructionsList, setInstructionsList] = useState(["", "", ""])
  const [ingredientsList, setIngredientsList] = useState(["", "", ""])


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

    const ingredients = [...ingredientsList]
    const instructions = [...instructionsList]
    const recipe_title = e.target.recipe_title.value || null
    const image_url = e.target.image_url.value || null
    const source_url = e.target.source_url.value || null
    const servings = e.target.servings.value || null
    const cook_time = e.target.cook_time.value || null

    const body = {
      recipe_title,
      image_url,
      source_url,
      servings,
      cook_time,
      ingredients,
      instructions,
    }

    const url = REACT_APP_BACKEND_URL_BASE + "/addrecipe"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${user.apitoken}`
      },
      body: JSON.stringify(body),
    }

    const res = await fetch(url, options);
    const data = await res.json();

    navigate(`/viewrecipe/${data.data.recipe_id}`)
    // TODO deal with errors if not success
  }


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
            fullWidth
            required
          />
          <br /><br />

          <TextField label="Image URL"
            id="image_url"
            required
            fullWidth
          />

          <br /><br />

          <TextField label="Source URL"
            id="source_url"
            required
            fullWidth
          />

          <br /><br />

          <Box>
            <TextField
              label="Servings"
              id="servings"
              type="number"
              sx={{ width: "200px", mr: 2, mb: 2 }}
            />

            <TextField
              label="Cook Time"
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
              Add Recipe
            </Button>
          </Box>


        </Paper>
      </Box>
      <br />
    </Container>
  )
}
