import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SearchByIngredientsCard({ recipe }) {
  const navigate = useNavigate()

  const makeIngredientsCategories = () => {
    const ingredientCategories = [
      ["Ingredients you have", recipe.usedIngredients],
      ["Ingredients you need", recipe.missedIngredients],
      ["Unused Ingredients", recipe.unusedIngredients],
    ]
    return (
      <>
        {
          ingredientCategories.map(([category, list]) => (
            <Typography key={category} variant="body2">
              <b>{category}: </b>
              {list.length === 0 ?
                <>None</>
                :
                <>{list.join(", ")}</>
              }
            </Typography>
          ))
        }
      </>
    )
  }

  return (
    <Card sx={{ maxWidth: 300, p: 1 }} elevation={4}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.image}
        sx={{
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ p: 1 }}>
        {/* Title */}
        <Typography variant="h6">{recipe.title}</Typography>
        {makeIngredientsCategories()}

      </CardContent>
      <CardActions disableSpacing={true}>
        <Box width="100%" textAlign="center">
          <Button
            color="secondary"
            onClick={() => { navigate("/viewsearchedrecipe/" + recipe.id) }}
          >
            View Recipe
          </Button>
        </Box>

      </CardActions>

    </Card>
  )
}
