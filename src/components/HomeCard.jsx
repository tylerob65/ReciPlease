import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import { Box, CardActionArea, CardContent, CardMedia, Paper, Slide, Typography } from '@mui/material'

export default function HomeCard({ isVisible, slideDirectionRight, imageUrl, cardIndex }) {
  const slideDirection = slideDirectionRight ? "right" : "left";

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
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "cover",
            width: "350px",
            height: "250px",
            display: "flex",
            flexDirection: "column-reverse"
          }}>
          <CardActionArea>
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
                  whiteSpace:"nowrap",
                  overflow:"hidden",
                  textOverflow:"ellipsis",
                }}
                >
                Chili Cheese Sweet Potato Casserole
              </Typography>
            </CardContent>
          </CardActionArea>

        </Card>


      </Box>
    </Slide>
  )
}
