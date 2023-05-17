import React from 'react'
import { Container } from '@mui/material'
import { Typography } from '@mui/material'
import { Alert } from '@mui/material'

export default function Home() {
    return (
        <Container>
            {/* <Alert onClose={()=>{}}>Here is the alert message</Alert> */}
            This is home page
            <h1>Hi</h1>
            <Typography variant="h1">Hi</Typography>
        </Container>
    )
}