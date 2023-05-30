import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

export default function RecipeContent({ recipeInfo }) {
  const showSteps = () => {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <Typography variant='h5' color="secondary">Instructions</Typography>
        </div>
        {recipeInfo.instructions.map((step, i) => (
          <Fragment key={i}>
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

  return (
    <>
      {/* Recipe Name, Shared By, Servings, and Cook Time */}
      <Typography variant="h2" mb={1} color="primary" sx={{ textAlign: "center" }}>{recipeInfo.title}</Typography>
      {recipeInfo.owner_username ?
        <Typography mt={-1}><small>Shared By: <em>
          <Link to={"/profile/" + recipeInfo.owner_id} style={{ color: "inherit" }}>
            {recipeInfo.owner_username}
          </Link>
        </em ></small></Typography>
        :
        <></>}
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
  )
}
