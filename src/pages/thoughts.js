import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@material-ui/core'

export default () => {
  const [thoughts, setThoughts] = useState(null)

  useEffect(() => {
    fetch('/.netlify/functions/thoughts')
      .then(response => response.json())
      .then(json => {
        setThoughts(
          json.data.map(item => ({
            id: item.ref['@ref'].id,
            ts: item.ts,
            text: item.data.text,
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Layout>
      <Grid container justify="center">
        {thoughts === null ? (
          <CircularProgress />
        ) : (
          thoughts.map(({ id, ts, text }) => (
            <Grid key={id} item xs={12}>
              <Card raised={false} square={true}>
                <CardContent>{text}</CardContent>
              </Card>
              <Divider />
            </Grid>
          ))
        )}
      </Grid>
    </Layout>
  )
}
