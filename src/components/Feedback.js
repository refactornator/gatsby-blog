import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Button, Card, CardHeader, CardContent } from '@material-ui/core'

import LikeButton from './LikeButton'
import FeedbackDialog from './FeedbackDialog'

const Container = styled.div`
  margin: auto;
  max-width: 300px;
`

export default () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
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

        <FeedbackDialog onClose={handleClose} open={dialogOpen} />
      </Card>
    </Container>
  )
}
