import React, { useState } from 'react'
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function LoginPage({ logMeIn }) {
    const navigate = useNavigate()

    let { user } = useUser()

    const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

    const [checked, setChecked] = useState(true)

    const handleChecked = (e) => {
        setChecked(e.target.checked)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(e)
        console.log(e.target)
        const username = e.target.username.value;
        const password = e.target.password.value;
        const rememberMe = e.target.staySignedIn.checked;

        const url = REACT_APP_BACKEND_URL_BASE + "/login"
        const options = {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(username + ":" + password)}`
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok') {
            const myUserInfo = data.data
            console.log(data)
            // TODO create logMeIn
            logMeIn(myUserInfo, rememberMe)
            navigate('/')
        }


    }
    return (
        <Container>
            <Typography variant="h1" color="primary">Login</Typography>
            <br />
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={handleSubmit}>
                <TextField
                    required
                    id="username"
                    label='Username'
                    variant='outlined'
                    name='username'
                    color="secondary"
                />
                <br />
                <TextField
                    required
                    id="password"
                    label='Password'
                    variant='outlined'
                    name='password'
                    type='password'
                    color="secondary"
                />
                <br />
                <FormControlLabel
                    control={<Checkbox checked={checked} id="staySignedIn" color="secondary" onChange={handleChecked} />}
                    label="Stay Signed In?"
                    sx={{ alignSelf: "start" }}
                />
                <br />
                <Button type='submit' variant='contained'>Submit</Button>
                hi{JSON.stringify(user)}
            </form>
        </Container>
    )
}
