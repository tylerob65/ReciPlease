import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { List, ListItem } from '@mui/material'
import React from 'react'

export default function ViewRecipe() {

    const steps = [
        "In a medium skillet over medium-low heat, heat oil. Add garlic and cook, stirring occasionally, until lightly golden, 2 to 4 minutes. Let cool.",
        "Meanwhile, set a large strainer or colander over a bowl.Add tomatoes and toss with 1 / 2 teaspoon salt.Let sit 5 minutes, then transfer tomatoes to a large bowl.",
        "Add basil, vinegar, red pepper, and remaining 1 / 2 teaspoon salt to bowl with tomatoes and toss to combine.Add garlic and oil from skillet and toss again to combine.Let marinate at least 30 minutes or up to 2 days.",
        "Preheat oven to 400°.Brush bread on both sides with oil and arrange on large baking sheet. ",
        "Toast bread, turning halfway through, until dried and golden brown, 10 to 15 minutes.Let cool 5 minutes, then rub one side of bread with halved garlic cloves.",
        "Arrange bread on a platter. Spoon tomatoes on top of bread just before serving.",
    ]

    const ingredients = [
        "1 / 4 c. extra - virgin olive oil",
        "2 cloves garlic, thinly sliced",
        "4 large tomatoes, finely chopped",
        "1 tsp. kosher salt, divided",
        "1 / 4 c. thinly sliced fresh basil",
        "2 tbsp. balsamic vinegar ",
        "Pinch of crushed red pepper flakes",
        '1 large baguette, sliced 1 / 4" thick on the bias',
        "Extra - virgin olive oil, for brushing",
        "2 cloves garlic, halved",
    ]

    const showIngredients = () => {
        return (
            <Box width="400px">
                <List>
                    <ListItem>
                        <Typography variant="h5" color="secondary">Ingredients</Typography>
                    </ListItem>
                    
                    {ingredients.map((ingredient, i) =>
                    (
                        <>
                        {i !== 0 ? <Divider variant="middle" light/> : ""}
                        <ListItem>{ingredient}</ListItem>
                        </>
                    )
                    )}
                </List>
            </Box>
        )
    }

    const showSteps = () => {
        return (
            <Box maxWidth="700px">
                {/* <Typography variant='h5' color="secondary" sx={{ fontWeight: "bold" }}>Instructions</Typography> */}
                <Typography variant='h5' color="secondary">Instructions</Typography>
                {steps.map((step,i) => (
                    <>
                    {/* <Typography sx={{fontWeight:"bold", mt:1}} variant="h6"> */}
                    <Typography sx={{mt:1}} variant="h6">
                        Step {i+1}
                    </Typography>
                    <Typography>
                        {step}
                    </Typography>

                    </>
                )

                )}
                
            </Box>

        )
    }

    return (
        <Container>
            <Grid
                container
                direction="column"
                alignItems="center"
                variant="outlined"
            >

                <Typography variant="h2" color="primary">Bruschetta</Typography>
                <br/>
                <img
                    src="https://hips.hearstapps.com/hmg-prod/images/bruschetta-secondary-645d03e6daed2.jpg?crop=1xw:1xh;center,top&resize=980:*" alt=""
                    style={{ width: "300px", height: "300px", objectFit: "contain" }}

                />
                
                {showIngredients()}
                <br />
                <br />
                
                {showSteps()}
                <p>https://www.delish.com/cooking/recipe-ideas/a27409128/best-bruschetta-tomato-recipe/</p>
            </Grid>
        </Container>
    )
}
