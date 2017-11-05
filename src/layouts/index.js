import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'

import Header from '../components/Header'
import Footer from '../components/Footer'

const Main = styled.main``

const Content = styled.section`
  margin: 0 auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Main>
        <Header />
        <Content>
          {children()}
          <Footer />
        </Content>
      </Main>
    )
  }
}

export default Template
