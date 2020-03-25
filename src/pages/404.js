import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'

import webm from '../video/404.webm'
import mp4 from '../video/404.mp4'

const Video = styled.video`
  width: 854px;
  height: 480px;
`

const Main = styled.h1`
  font-family: courier;
  text-align: center;
  font-size: 64px;
  font-style: bold;
`

const NotFoundPage = () => (
  <Layout title="404 - Page Not Found | William Lindner's Blog">
    <Main>404: Page Not Found</Main>
    <Video autoPlay loop controls>
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </Video>
  </Layout>
)

export default NotFoundPage
