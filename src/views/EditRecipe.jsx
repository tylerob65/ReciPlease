import { Box, Button, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState, Fragment } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMessage } from '../context/MessageContext'
import InputAdornment from '@mui/material/InputAdornment';


export default function EditRecipe() {

  // let { addMessage } = useMessage()

  const [instructionsList, setInstructionsList] = useState(["1", "", ""])
  const [ingredientsList, setIngredientsList] = useState(["2", "", ""])

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


  return (
    <Container>
      <br />
      <Box
        component="form"
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
            id="recipe-title"
            fullWidth
            required
          />
          <br /><br />

          <TextField label="Image URL"
            id="recipe-title"
            required
            fullWidth
          />

          <br/><br/>

          <Box>
          <TextField
            label="Servings"
            id="servings"
            type="number"
            sx={{width:"200px",mr:2,mb:2}}
          />

          <TextField
            label="Cook Time"
            id="cooktime"
            type="number"
            sx={{ width: "200px" }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>mins</InputAdornment>

            }}
          />
          </Box>

          {/* IN PROGRESS ATTEMPT TO MESS AROUND WITH GRID */}

          {/* <Grid container spacing={2} columns ={{xs:4,md:12}} justifyContent="center">
            <Grid item xs={4} md={6} textAlign="center">
              <TextField
                label="Servings"
                id="servings"
                type="number"
              // sx={{width:"200px"}}
              />
            </Grid>

            <Grid item xs={4} md={6} textAlign="center">

              <TextField
                label="Cook Time"
                id="cooktime"
                type="number"
                // sx={{ width: "200px" }}
                sx={{flexGrow:1}}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>mins</InputAdornment>

                }}
              />
            </Grid>
          </Grid> */}
          

          <Divider sx={{ my: 2 }} />

          {/* 
          INGREDIENTS SECTION
          */}

          <Typography color="primary" variant="h4" mb={1}>Ingredients</Typography>
          {showIngredientInputs()}

          {/* Ingredients Buttons */}
          <Box textAlign="center">
            <Button sx={{ m: 1, width:"170px"}} variant="outlined" color="success" startIcon={<AddIcon />} onClick={handleAddIngredient} disabled={ingredientsList.length > 14}>
              Add New Step
            </Button>

            <Button sx={{ m: 1, width:"170px"}} variant="outlined" color="error" startIcon={<RemoveIcon />} onClick={handleRemoveIngredient} disabled={ingredientsList.length <= 1}>
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
            <Button sx={{ m: 1, width: "170px" }} variant="outlined" color="success" startIcon={<AddIcon />} onClick={handleAddInstruction} disabled={instructionsList.length > 14}>
              Add New Step
            </Button>

            <Button sx={{ m: 1, width: "170px" }} variant="outlined" color="error" startIcon={<RemoveIcon />} onClick={handleRemoveInstruction} disabled={instructionsList.length <= 1}>
              Remove Step
            </Button>
          </Box>

        </Paper>
      </Box>
    </Container>
  )
}
