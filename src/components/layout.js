import React from 'react'
import { Helmet } from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'

import { rhythm } from '../utils/typography'

import Header from '../components/Header'
import Footer from '../components/Footer'

injectGlobal`
  html, body, #___gatsby, [role="group"] {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f7f7f7;
  }
`

const Main = styled.main`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

const Content = styled.section`
  width: 100%;
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
        <Helmet>
          <meta name="description" content="William Lindner's Blog" />
        </Helmet>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Main>
    )
  }
}

export default Template
