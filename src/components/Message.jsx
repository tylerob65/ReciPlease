import React from 'react'
import { useMessage } from '../context/MessageContext'
import Alert from '@mui/material/Alert'

export default function Message({ text, severity, index }) {
  const { removeMessage } = useMessage()

  return (
    <Alert severity={severity} onClose={() => { removeMessage(index) }}>
      {text}
    </Alert>
  )
}
