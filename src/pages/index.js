import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import FeedbackDialog from '../components/FeedbackDialog'

import webm from '../video/intro.webm'
import mp4 from '../video/intro.mp4'

const Summary = styled.div`
  margin-bottom: 40px;

  @media all and (max-width: 860px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

const IntroVideo = styled.video`
  width: 200px;
  float: right;
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
        <IntroVideo autoPlay loop controls alt="William Lindner">
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </IntroVideo>
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
            https://github.com/wlindner
          </a>
          .
        </p>

        <p>
          I never check{' '}
          <a target="_blank" href="https://www.linkedin.com/in/wlindner">
            https://www.linkedin.com/in/wlindner
          </a>
          .
        </p>

        <p>
          Check out my <Link to="/essays">essays</Link>.
        </p>
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
