import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
} from '@material-ui/core'

import LikeButton from './LikeButton'

const Container = styled.div`
  margin: auto;
  max-width: 300px;
`

export default () => {
  const [submitting, setSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const submitFeedback = () => {
    console.log('submitting')
    setSubmitting(true)
    fetch('/.netlify/functions/feedback', {
      body: value,
      method: 'POST',
    })
      .then(response => {
        setValue('')
        setSubmitting(false)
        setDialogOpen(false)
        return response.json()
      })
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.log(error)
        setSubmitting(false)
      })
  }

  return (
    <Container>
      <Card variant="outlined">
        <CardHeader
          subheader="Anonymous Feedback"
          style={{ paddingBottom: 8 }}
        />
        <CardContent style={{ paddingTop: 0 }}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button variant="contained" onClick={handleClickOpen}>
                Send message
              </Button>
            </Grid>
            <Grid item>
              <LikeButton />
            </Grid>
          </Grid>
        </CardContent>

        <Dialog onClose={handleClose} open={dialogOpen}>
          <DialogContent>
            <DialogContentText>
              An anonymous way to tell me what you think. This is only seen by
              me.
            </DialogContentText>
            <TextField
              multiline
              autoFocus
              rows={3}
              disabled={submitting}
              label="Feedback"
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
              <Button
                onClick={submitFeedback}
                color="primary"
                disabled={submitting}
              >
                Send
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  )
}
