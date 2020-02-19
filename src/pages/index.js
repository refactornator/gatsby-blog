import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import FeedbackDialog from '../components/FeedbackDialog'

const Summary = styled.div`
  display: flex;
  margin-bottom: 40px;

  @media all and (max-width: 860px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

const Content = styled.div`
  max-width: 900px;
  padding: 0 20px;
`

export default ({ data }) => {
  const { title } = data.site.siteMetadata
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <Layout title={title}>
      <Summary>
        <Content>
          <h1>Welcome to William's website.</h1>
          <h2>A place to share my thoughts.</h2>
          <p>
            <a href="#" onClick={handleClickOpen}>
              Send me a message
            </a>{' '}
            if you want to contact me about something.
          </p>
          <p>
            I sometimes write code on{' '}
            <a target="_blank" href="https://github.com/wlindner">
              Github
            </a>
            .
          </p>
          <p>
            Check out my <Link to="/essays">essays</Link>.
          </p>
        </Content>
        <iframe width="270" height="470"
                src="https://www.youtube-nocookie.com/embed/D4O-JSXoUL8?modestbranding=1&controls=0&playsinline=1&loop=1&autoplay=1"
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
      </Summary>
      <FeedbackDialog onClose={handleClose} open={dialogOpen} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
