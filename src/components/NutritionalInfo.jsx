import React from 'react'
import SpoonacularChip from './SpoonacularChip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function NutritionalInfo({ nutritionalInfo, servings }) {
  const one_dec = (val) => (Math.round(val * 10) / 10)
  const serves = servings || 1

  const makeCardGroup = (primaryOrSecondary) => {
    const nutrition = nutritionalInfo[primaryOrSecondary]
    return (
      <>
        {Object.keys(nutrition).map((name) => {
          let amount = nutrition[name].amount;
          amount = one_dec(amount)
          let unit = nutrition[name].unit;
          let percentOfDailyNeeds = one_dec(nutrition[name]["percentOfDailyNeeds"])
          return (
            <Typography key={name}>
              <b>{name}: </b>
              {amount}
              {unit}
              <span style={{ float: "right" }}>{percentOfDailyNeeds}%</span>
            </Typography>
          )
        })}
      </>
    )
  }


  return (
    <Box p={2} sx={{ border: "1px solid black", minWidth: "300px" }}>
      <Typography variant="h5"><b>Nutritional Facts</b></Typography>
      <Typography><small><b>Per Serving</b> (serves {serves})</small></Typography>

      <Typography variant="h6"><b>Calories: </b> {one_dec(nutritionalInfo["Calories"]["amount"])}</Typography>

      <br />

      <Typography><b><u>Nutrient</u><span style={{ float: "right" }}><u>% daily value</u></span></b></Typography>

      {makeCardGroup("primary")}
      <hr />
      {makeCardGroup("secondary")}
      <br />
      <SpoonacularChip text="from spoonacular api" />
    </Box>
  )
}
