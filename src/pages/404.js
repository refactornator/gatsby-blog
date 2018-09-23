import React from 'react'
import styled from 'styled-components'

import webm from '../video/404.webm'
import mp4 from '../video/404.mp4'

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
  background-color: black;
`

const FullPageVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const NotFoundPage = () => (
  <Container>
    <FullPageVideo autoPlay loop controls>
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </FullPageVideo>
  </Container>
)

export default NotFoundPage
