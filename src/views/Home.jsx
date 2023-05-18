import React from 'react'
import { Box, Container } from '@mui/material'
import { Typography } from '@mui/material'

export default function Home() {
    return (
        <Container sx={{textAlign:"center"}}>
            <Typography
                color="secondary"
                component="h1"
                sx={{
                    fontFamily: 'Pacifico,cursive',
                    fontSize: "3.5rem"
                }}
            >
                Welcome
            </Typography>

            <Box
                sx={{ backgroundImage:"https://hips.hearstapps.com/hmg-prod/images/delish-202210-padseeew-165-1666972356.jpg?crop=1.00xw:0.752xh;0,0.144xh&resize=1200:*"}}
            >
            </Box>
            {/* <img src="https://hips.hearstapps.com/hmg-prod/images/delish-202210-padseeew-165-1666972356.jpg?crop=1.00xw:0.752xh;0,0.144xh&resize=1200:*" alt="" /> */}

            



        </Container>
    )
}