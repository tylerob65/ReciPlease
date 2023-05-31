import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessage } from '../context/MessageContext'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function LoginPage({ logMeIn }) {
  const navigate = useNavigate()

  let { addMessage } = useMessage()

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const [checked, setChecked] = useState(true)

  const handleChecked = (e) => {
    setChecked(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      logMeIn(myUserInfo, rememberMe)
      navigate('/')
    } else {
      addMessage(data.message, data.severity)
    }
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" color="primary">Login</Typography>
      <br />
      <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        onSubmit={handleSubmit}>
        <TextField
          required
          id="username"
          label='Username'
          variant='outlined'
          name='username'
          color="secondary"
          sx={{ width: "100%" }}
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
          sx={{ width: "100%" }}
        />
        <br />
        <FormControlLabel
          control={<Checkbox checked={checked} id="staySignedIn" color="secondary" onChange={handleChecked} />}
          label="Stay Signed In?"
        />
        <br />
        <Button type='submit' variant='contained' sx={{ width: "200px" }}>Submit</Button>
      </form>
    </Container>
  )
}
