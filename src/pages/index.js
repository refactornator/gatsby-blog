import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Codepen from 'react-codepen-embed'

import Layout from '../components/Layout'
import MessageDialog from '../components/MessageDialog'

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

  const handleOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <Layout title={title}>
      <Summary>
        <Content>
          <h1>Welcome to William Lindner's website.</h1>
          <h2>A place to share my thoughts.</h2>
          <p>
            I live in <Link to="/moving-to-san-francisco">San Francisco</Link>.
          </p>
          <p>
            I really enjoy{' '}
            <Link to="/holotropic-breathwork">Holotropic Breathwork</Link>.
          </p>
          <p>
            I do software consulting at{' '}
            <Link to="/my-first-two-years-at-pivotal">VMware Pivotal Labs</Link>
            .
          </p>
          <p>
            One time I <Link to="/learning-elixir">learned Elixir</Link>.
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
          <p>
            <a href="#" onClick={handleOpen}>
              Send me a message
            </a>{' '}
            if you want to contact me about something.
          </p>
        </Content>
        <iframe
          width="270"
          height="470"
          src="https://www.youtube-nocookie.com/embed/D4O-JSXoUL8?modestbranding=1&controls=0&playsinline=1&loop=1&playlist=D4O-JSXoUL8&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </Summary>
      <Codepen hash="IKGJi" user="wlindner" defaultTab="result" />
      <MessageDialog onClose={handleClose} open={dialogOpen} />
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
