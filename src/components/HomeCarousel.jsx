import React, { useEffect, useState } from 'react'
import { Box, Button, Paper } from '@mui/material'
import HomeCard from './HomeCard'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';


export default function HomeCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const [slideDirectionRight, setSlideDirectionRight] = useState(false)
  // const [currentIndex,setCurrentIndex] = useState(0)
  const maxIndex = 2
  const [isVisibleArray, setIsVisibleArray] = useState([true, false, false])
  const [transitionStates, setTransitionStates] = useState({
    "currentIndex": 0,
    "isVisible": [true, false, false, false, false],
    "goesRight": [false, true, true, true, true]
  })


  // When increase index
  // Before incrementing
  // Set Current Card visibility false
  // Set Next Card visibility to true
  // Set current Card direction "right"
  // Set next card direction to "left"
  // Current 

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

  // setInterval(() => {
  //   increaseIndex()
  // }, 3000);
  // useEffect(()=>{
  //   let newVisibleArray = Array(maxIndex+1).fill(false)
  //   newVisibleArray[currentIndex] = true
  //   setIsVisibleArray(newVisibleArray)
  // },[currentIndex])
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //   }, 1000);
  //   // return () => clearInterval(interval);
  // }, []);

  // useEffect(()=>{
  //   setInterval(()=>{
  //     increaseIndex()
  //   },2000)
  // },[])

  const imageUrls = [
    "https://hips.hearstapps.com/hmg-prod/images/190409-creamy-steak-fettucine-vertical-2-1661787057.png?crop=1.00xw:0.667xh;0,0.165xh&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/delish-202101-blackbeantostadas-037-ls-1610740382.jpg?crop=0.634xw:0.952xh;0.231xw,0.00255xh&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/singleimagebug-arroz-con-pollo-pin-1556284551.jpg?crop=0.963xw:0.607xh;0.0102xw,0.305xh&resize=768:*",
    "https://hips.hearstapps.com/hmg-prod/images/instant-pot-jambalaya-1674050072.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
    "https://hips.hearstapps.com/hmg-prod/images/sloppy-joe-meatball-bake1-1669667177.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  ]

  return (
    <Box>
      {/* <Paper elevation={4} sx={{ height: "500px" }} > */}
      <Box position="static" >
        <Box position="relative" sx={{ height: "270px", left: "auto" }}>
          <HomeCard
            // isVisible={isVisibleArray[0]}
            isVisible={transitionStates.isVisible[0]}
            // slideDirectionRight={slideDirectionRight}
            slideDirectionRight={transitionStates.goesRight[0]}
            imageUrl={imageUrls[0]}
            cardIndex={0}
          />

          <HomeCard
            isVisible={transitionStates.isVisible[1]}
            slideDirectionRight={transitionStates.goesRight[1]}
            imageUrl={imageUrls[1]}
            cardIndex={1}
          />

          <HomeCard
            isVisible={transitionStates.isVisible[2]}
            slideDirectionRight={transitionStates.goesRight[2]}
            imageUrl={imageUrls[2]}
            cardIndex={2}
          />


        </Box>
      </Box>

      <Box sx={{mx:"auto"}}width="200px" display="flex" justifyContent="space-between">
        {/* <Button
        onClick={() => { setIsVisible(!isVisible) }}
      >
        Visible
      </Button>
      <Button
        onClick={() => { setSlideDirectionRight(!slideDirectionRight) }}
      >
        Slide Direction {slideDirectionRight ? "Right" : "Left"}
      </Button> */}
        {/* <Button onClick={decreaseIndex} color="secondary">Decrease</Button>
        <Button onClick={increaseIndex} color="secondary">Increase</Button> */}

        <IconButton color="secondary" onClick={decreaseIndex}>
          <ArrowBackOutlinedIcon fontSize="large"/>
        </IconButton>
        <IconButton color="secondary" onClick={increaseIndex}>
          <ArrowForwardOutlinedIcon fontSize="large"/>
        </IconButton>
      </Box>
      {/* </Paper> */}
    </Box>

  )
}
