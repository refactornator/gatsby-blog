import React from 'react'

import { Grid, Card, CardContent, Divider } from '@material-ui/core'

export default ({ thoughts }) => {
  return (
    <>
      {thoughts.map(({ id, ts, text }) => (
        <Grid key={id} item xs={12}>
          <Card raised={false} square={true}>
            <CardContent>{text}</CardContent>
          </Card>
          <Divider />
        </Grid>
      ))}
    </>
  )
}
