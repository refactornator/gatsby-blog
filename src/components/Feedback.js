import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

import LikeButton from './LikeButton'

const Container = styled.div`
  margin: 50px auto 50px auto;
`

export default () => {
  return (
    <Container>
      <Grid container justify="flex-end">
        <LikeButton />
      </Grid>
    </Container>
  )
}
