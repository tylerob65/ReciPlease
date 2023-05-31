import React from 'react'
import { Link as MuiLink } from '@mui/material'
import Chip from '@mui/material/Chip'

export default function ({ text }) {
  text = text || "spoonacular recipe"
  return (
    <MuiLink
      href="https://spoonacular.com/food-api"
      target="_blank"
      rel="noopener"
      sx={{ textDecoration: "none" }}
    >
      <Chip
        size="small"
        label={text}
        variant="outlined"
        sx={{ color: "#00843c", borderColor: '#00843c'}}
        onClick={() => { }}
      />
    </MuiLink>
  )
}
