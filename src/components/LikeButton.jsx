import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function LikeButton({recipeID, recipeInfo}) {
  const { user } = useUser()

  const [recipeIsLiked,setRecipeIsLiked] = useState(null)
  
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const findOutIfLike = async () => {
    if (!user.apitoken) return;

    const url = REACT_APP_BACKEND_URL_BASE + "/doilike/" + recipeID
    const headers = { Authorization: `Bearer ${user.apitoken}` }
    const options = {headers:headers}
    const res = await fetch(url,options)
    const data = await res.json()
    console.log("got data")
    console.log(data)
    setRecipeIsLiked(data.data.liked)
  }
  const likeRecipe_original = async (e) => {
    e.preventDefault();
    const url = REACT_APP_BACKEND_URL_BASE + "/likerecipe"
    
    const body = {
      "recipe_id":recipeID,
    }

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
    console.log(res)
    const data = await res.json();

    // TODO add error message if data/status is not ok
    if (data.status === "ok") {
      setRecipeIsLiked(true)
    }
  }

  const likeRecipe = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/likerecipe/" + recipeID

    const headers = { Authorization: `Bearer ${user.apitoken}` }
    const options = { headers: headers }
    const res = await fetch(url, options)
    const data = await res.json()

    // // TODO add error message if data/status is not ok
    if (data.status === "ok") {
      setRecipeIsLiked(true)
    }
  }

  const unlikeRecipe = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/unlikerecipe/" + recipeID

    const headers = { Authorization: `Bearer ${user.apitoken}` }
    const options = { headers: headers }
    const res = await fetch(url, options)
    const data = await res.json()

    // // TODO add error message if data/status is not ok
    if (data.status === "ok") {
      setRecipeIsLiked(false)
    }
  }

  useEffect(()=>{
    findOutIfLike()
  },[])
  
  // Show nothing if user isn't signed in
  if (!user.apitoken) return (<></>);
  // Show nothing if recipe info hasn't loaded
  if (!recipeInfo.owner_id) return (<></>);
  // Show nothing if button of for own user's recipe
  if (recipeInfo.owner_id === user.id) return (<></>);

  if (recipeIsLiked === null) {
    return (<></>)
  }

  if (!recipeIsLiked) {
    return (
      <>
      <Chip icon={<FavoriteBorderIcon />} size="small" label="Like" variant="outlined" onClick={likeRecipe}/>
      </>
    )
  }
  

  return (
    <>
      <Chip icon={<FavoriteIcon />} size="small" label="Liked" color="secondary" variant="outlined" onClick={unlikeRecipe}/>
    </>
  )
}

