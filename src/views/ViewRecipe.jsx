import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { Link as MuiLink, List, ListItem } from '@mui/material'
import React, { useState } from 'react'
import { Fragment, useEffect} from 'react'
import { themeOptions } from '../themes/primaryTheme'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useUser } from '../context/UserContext'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom'


export default function ViewRecipe() {

    const { recipeID } = useParams()

    const {user} = useUser()
    const navigate = useNavigate()

    const [recipeInfo,setRecipeInfo] = useState({})
    let foundRecipe = Object.keys(recipeInfo).length !== 0
    
    const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE
    // console.log("recipe id",recipeID)

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
    // export const themeOptions = {
    //     palette: {
    //         type: 'light',
    //         mode: 'light',
    //         primary: {
    //             main: '#ffb206',
    //         },
    //         secondary: {
    //             main: '#ff066f',
    //         },
    //         lightprimary: {
    //             main: '#fff4dd',
    //         },
    //         lightsecondary: {
    //             main: '#fff1f7',
    //         }
    // console.log(themeOptions)
    // console.log(themeOptions.palette.lightsecondary.main)

    const getRecipeInfo = async () => {
        const url = REACT_APP_BACKEND_URL_BASE + "/viewrecipe/" + recipeID
        const res = await fetch(url)
        const data = await res.json()
        console.log("recipeinfo",recipeInfo)
        console.log("foundrecipe",foundRecipe)
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

    const handleEditRecipe = async() => {
        navigate("/modifyrecipe/" + recipeID)
        return
    }


    return (
        <Container>
            <Paper elevation={4}
                sx={{ alignItems: "center", flexDirection: "column", display: "flex" }}
            >
                
                {!foundRecipe ?
                    "No Recipe Found"
                    :
                    <>
                    <Box width="100%">
                        <Box p={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Chip icon={<FavoriteIcon />} size="small" label="Liked" color="secondary" variant="outlined" onClick={() => setTimeout(2)} />
                                <Chip icon={<CheckCircleIcon />} size="small" label="Followed" color="info" variant="outlined" onClick={() => setTimeout(2)} />

                                {/* <Typography>Posted By: </Typography> */}
                            </Stack>
                        </Box>
                    {/* <Box p={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip icon={<FavoriteBorderIcon />} size="small" label="Like" variant="outlined" onClick={() => setTimeout(2)} />
                            <Chip icon={<BookmarkBorderIcon />} size="small" label="Followed" variant="outlined" onClick={() => setTimeout(2)} />
                            <Typography>Posted by Tim</Typography>
                        </Stack>
                    </Box> */}
                    </Box>


                    {/* 
            
                    Below is the main content. Above is just the chips
            
                    */}

                    <Typography variant="h2" color="primary" sx={{ textAlign: "center" }}>{recipeInfo.title}</Typography>
                    <Typography mt={-1}><small>Shared By: <em>{recipeInfo.owner_username}</em ></small></Typography>


                    <br />
                    <Grid
                        container
                        // direction="row-reverse"
                        alignItems="center"
                        justifyContent="space-around"
                        alignContent="center"
                        maxWidth="md"
                        px={4}
                    >
                        <Grid item sx={{display:"flex", justifyContent:"center"}}>
                            <img
                                src={recipeInfo.image_url} alt=""
                                style={{ maxHeight: "300px", width:"min(300px,90%)",objectFit: "contain" }}
                                // style={{ maxHeight: "300px", width:"300px",objectFit: "contain" }}
                            />
                        </Grid>
                        {/* <div sx={{flexGrow:1}}/> */}
                        {showIngredients()}
                    </Grid>
                    <br />
                    <br />

                    <Grid container justifyContent="center" px={4}>
                        <Box maxWidth="md" flexGrow="1">
                            {showSteps()}
                            <br />
                            <br />
                            <Typography color="secondary">Source</Typography>
                            <MuiLink
                                href="https://www.delish.com/cooking/recipe-ideas/a27409128/best-bruschetta-tomato-recipe/"
                                target="_blank"
                                rel="noopener"
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
                {user.id!==recipeInfo.owner_id?
                "They don't match"
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
            
            </Paper>
            <br />
        </Container>
    )
}
