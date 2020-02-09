import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ThoughtList from '../components/ThoughtList'
import { Grid, CircularProgress } from '@material-ui/core'

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
    <Layout title="Thoughts">
      <Grid container justify="center">
        {thoughts === null ? (
          <CircularProgress />
        ) : (
          <ThoughtList thoughts={thoughts} />
        )}
      </Grid>
    </Layout>
  )
}
