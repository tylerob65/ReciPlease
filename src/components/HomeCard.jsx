import React from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'

export default function HomeCard({ isVisible, slideDirectionRight, recipeInfo, cardIndex }) {
  const slideDirection = slideDirectionRight ? "right" : "left";
  const navigate = useNavigate()

  return (
    <Slide direction={slideDirection} in={isVisible} unmountOnExit timeout={900}
    >
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          position: "absolute",
          ml: "auto",
          mr: "auto",
          left: "0",
          right: "0",
          maxWidth: "450px",
          height: "300px",
          p: 1
        }}
      >
        <Card
          elevation={4}
          sx={{
            backgroundImage: `url(${recipeInfo.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            width: "350px",
            height: "250px",
            display: "flex",
            flexDirection: "column-reverse"
          }}>
          <CardActionArea
            onClick={() => { navigate("viewrecipe/" + recipeInfo.recipe_id) }}
          >
            <CardContent
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(3px)",
                p: 1,
                textAlign: "start",
                "&:last-child": {
                  pb: 1
                }
              }}
            >
              <Typography
                variant="h6"
                color="secondary"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {recipeInfo.recipe_title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Slide>
  )
}
