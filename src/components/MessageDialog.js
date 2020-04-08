import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
} from '@material-ui/core'

export default ({ onClose: handleClose, open }) => {
  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const submitMessage = () => {
    console.log('submitting')
    setSubmitting(true)
    fetch('/.netlify/functions/messages', {
      body: value,
      method: 'POST',
    })
      .then(() => {
        setValue('')
        setSubmitting(false)
        handleClose()
      })
      .catch((error) => {
        console.log(error)
        setSubmitting(false)
      })
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
        <DialogContentText>
          An anonymous way to tell me what you think. This is only seen by me.
        </DialogContentText>
        <TextField
          multiline
          autoFocus
          rows={3}
          disabled={submitting}
          label="Message"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={submitting}>
          Cancel
        </Button>
        {submitting ? (
          <CircularProgress />
        ) : (
          <Button onClick={submitMessage} color="primary" disabled={submitting}>
            Send
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
