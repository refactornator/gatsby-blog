import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

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
  padding: 0 6px;
`

const Title = styled.h1`
  width: 100%;
  font-weight: bold;
  font-size: 100%;
  margin-bottom: 8px;
`

const SubTitle = styled.h2`
  width: 100%;
  font-size: 100%;
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
          <Title>Welcome to William's website.</Title>
          <SubTitle>A place to share my thoughts.</SubTitle>
          <p>
            I live in <Link to="/moving-to-san-francisco">San Francisco</Link>.
            I really enjoy{' '}
            <Link to="/holotropic-breathwork">Holotropic Breathwork</Link>,
            Improv, and <Link to="/lessons-learned-kickboxing">Kickboxing</Link>
            . I do software consulting at{' '}
            <Link to="/my-first-two-years-at-pivotal">VMware Pivotal Labs</Link>
            . One time I <Link to="/learning-elixir">learned Elixir</Link>.
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
          <p style={{ color: '#366ddc' }}>
            <a href="#" onClick={handleOpen}>
              Tell me what you think
            </a>
          </p>
        </Content>
        <iframe
          width="265"
          height="470"
          src="https://www.youtube-nocookie.com/embed/D4O-JSXoUL8?modestbranding=1&controls=0&playsinline=1&loop=1&playlist=D4O-JSXoUL8&autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </Summary>
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
