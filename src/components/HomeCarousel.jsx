import React, { useEffect, useState } from 'react'
import HomeCard from './HomeCard'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

export default function HomeCarousel() {
  const [recipeList, setRecipeList] = useState([])
  const maxIndex = 4
  const [transitionStates, setTransitionStates] = useState({
    "currentIndex": 0,
    "isVisible": [true, false, false, false, false],
    "goesRight": [false, true, true, true, true]
  })
  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const getRandomCarouselRecipes = async () => {
    const url = REACT_APP_BACKEND_URL_BASE + "/getrandomhomepagerecipes"
    const res = await fetch(url)
    const data = await res.json()
    console.log("ran get recipe")
    console.log(data)
    if (data.status === "ok") {
      setRecipeList(data.data)
      return
    }
  }

  useEffect(() => {
    getRandomCarouselRecipes()
  }, [])

  const getCopyOfTransitionState = () => {
    return {
      currentIndex: transitionStates.currentIndex,
      isVisible: [...transitionStates.isVisible],
      goesRight: [...transitionStates.goesRight],
    }
  }

  const getNextIndex = (i) => (i === maxIndex ? 0 : i + 1);
  const getPreviousIndex = (i) => i === 0 ? maxIndex : i - 1;

  const increaseIndex = () => {
    const currentIndex = transitionStates.currentIndex
    const nextIndex = getNextIndex(currentIndex)

    let newTransitionStates = getCopyOfTransitionState()

    newTransitionStates.currentIndex = nextIndex
    newTransitionStates.isVisible[currentIndex] = false
    newTransitionStates.isVisible[nextIndex] = true
    newTransitionStates.goesRight[currentIndex] = true
    newTransitionStates.goesRight[nextIndex] = false
    setTransitionStates(newTransitionStates)
  }

  const decreaseIndex = () => {
    const currentIndex = transitionStates.currentIndex

    const previousIndex = getPreviousIndex(currentIndex)

    let newTransitionStates = getCopyOfTransitionState()

    newTransitionStates.currentIndex = previousIndex
    newTransitionStates.isVisible[currentIndex] = false
    newTransitionStates.isVisible[previousIndex] = true
    newTransitionStates.goesRight[currentIndex] = false
    newTransitionStates.goesRight[previousIndex] = true
    setTransitionStates(newTransitionStates)
    return
  }

  if (recipeList.length === 0) {
    return (
      <></>
    )
  }

  return (
    <Box>
      <Box position="static" >
        <Box position="relative" sx={{ height: "270px", left: "auto" }}>
          {
            recipeList.map((recipeInfo, i) => (
              <HomeCard
                key={i}
                isVisible={transitionStates.isVisible[i]}
                slideDirectionRight={transitionStates.goesRight[i]}
                recipeInfo={recipeList[i]}
              />
            ))
          }
        </Box>
      </Box>

      {/* Arrow Buttons */}
      <Box sx={{ mx: "auto" }} width="200px" display="flex" justifyContent="space-between">
        <IconButton color="secondary" onClick={decreaseIndex}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </IconButton>
        <IconButton color="secondary" onClick={increaseIndex}>
          <ArrowForwardOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
}
