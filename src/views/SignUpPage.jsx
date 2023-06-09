import React, { useState } from 'react'
import { useMessage } from '../context/MessageContext'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function SignUpPage({ logMeIn }) {
  const navigate = useNavigate()
  const { addMessage } = useMessage()

  const [checked, setChecked] = useState(true)

  const handleChecked = (e) => {
    setChecked(e.target.checked)
  }

  const REACT_APP_BACKEND_URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirmPassword.value;

    const url = REACT_APP_BACKEND_URL_BASE + "/signup"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        confirm_password: confirm_password,
      })
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.status === 'ok') {
      // TODO Show success msg
      const myUserInfo = data.data
      const rememberMe = e.target.staySignedIn.checked;

      logMeIn(myUserInfo, rememberMe)
      navigate('/')
    } else {
      addMessage(data.message, data.severity)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" color="primary">Sign Up</Typography>
      <br />
      <form
        style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}
        onSubmit={handleSubmit}
      >
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
          id="email"
          label='Email'
          variant='outlined'
          name='email'
          color="secondary"
          sx={{ width: "100%" }}
        />
        <br />
        <TextField
          required
          id="first_name"
          label='First Name'
          variant='outlined'
          name='first_name'
          color="secondary"
          sx={{ width: "100%" }}
        />
        <br />
        <TextField
          id="last_name"
          label='Last Name'
          variant='outlined'
          name='last_name'
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
        <TextField
          required
          id="confirmPassword"
          label='Confirm Password'
          variant='outlined'
          name='confirmPassword'
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
