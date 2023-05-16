import React from 'react'
import { Typography } from '@mui/material'

export default function NavLogo() {
    const generateLogoText = (color,text) => {
        return (
            <Typography
                color={color}
                component="h3"
                sx={{
                    fontFamily: 'Pacifico,cursive',
                    fontSize:"1.5rem"
                }}
            >
                {text}
            </Typography>

        )
    }

    return (
        // <Typography
        //     noWrap
        //     component="a"
        //     // href="/"
        //     sx={{
        //         mr: 2,
        //         display: { xs: 'none', md: 'flex' },
        //         fontFamily: 'Pacifico,cursive',
        //         fontWeight: 700,
        //         letterSpacing: '.3rem',
        //         color: 'black',
        //         textDecoration: 'none',
        //     }}
        // >
        <>
            {generateLogoText("primary","Reci")}
            {generateLogoText("secondary","Please")}
        </>
        // </Typography>

    )
}
