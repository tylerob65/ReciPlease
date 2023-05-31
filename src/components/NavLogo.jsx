import React from 'react'
import Typography from '@mui/material/Typography'

export default function NavLogo() {
  const generateLogoText = (color, text) => {
    return (
      <Typography
        color={color}
        component="h3"
        sx={{
          fontFamily: 'Pacifico,cursive',
          fontSize: "1.5rem"
        }}
      >
        {text}
      </Typography>
    )
  }
  return (
    <>
      {generateLogoText("primary", "Reci")}
      {generateLogoText("secondary", "Please")}
    </>
  )
}
