import React from 'react'
import Link from 'gatsby-link'
import styled, { injectGlobal } from 'styled-components'

import { rhythm } from '../utils/typography'

import Header from '../components/Header'
import Footer from '../components/Footer'

injectGlobal`
`

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.section`
  flex: 1 0 auto;
  margin: 0 auto;
  max-width: ${rhythm(30)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Main>
        <Header />
        <Content>{children()}</Content>
        <Footer />
      </Main>
    )
  }
}

export default Template
