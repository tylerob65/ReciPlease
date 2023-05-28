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
import LikeButton from '../components/LikeButton'
import Collapse from '@mui/material/Collapse';
import NutritionalInfo from '../components/NutritionalInfo'
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewRecipe() {

    const { recipeID } = useParams()

    const {user} = useUser()
    const navigate = useNavigate()
    const [visibleNutritionalInfo,setVisibleNutritionalInfo] = useState(false)

    const [recipeInfo,setRecipeInfo] = useState({})
    let foundRecipe = Object.keys(recipeInfo).length !== 0
    
    const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE
    // console.log("recipe id",recipeID)
    

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
    
    const showNutritionalInfo = () => {
        
        return (
            <>
            {recipeInfo.nutritional_info?
                <NutritionalInfo nutritionalInfo={recipeInfo.nutritional_info}/>
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
                nutritional_info:data.data,
            }
            setRecipeInfo(newRecipeInfo)
            setVisibleNutritionalInfo(true)
        }        
    }


    return (
        <Container>
            <br/>
            <Paper elevation={4}
                sx={{ alignItems: "center", flexDirection: "column", display: "flex" }}
            >
                
                {!foundRecipe ?
                    <Box width="100%" height="300px" sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <CircularProgress/>
                    </Box>
                    :
                    <>
                    <Box width="100%">
                        <Box p={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <LikeButton recipeID={recipeID} recipeInfo={recipeInfo}/>
                                {/* Followed Icon - Will use later */}
                                
                                {/* <Chip size="small" label="from spoonacular" color="info" variant="outlined" onClick={() => setTimeout(2)} /> */}

                                {/* <Chip icon={<CheckCircleIcon />} size="small" label="Followed" color="info" variant="outlined" onClick={() => setTimeout(2)} /> */}
                            </Stack>
                        </Box>
                    
                    {/* Follow Icon, will use later  */}
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
                {user.id!==recipeInfo.owner_id?
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
                    {visibleNutritionalInfo?"Hide":"Show"} Nutritional Info
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
