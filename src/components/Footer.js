import React from 'react'
import styled from 'styled-components'

import { colors } from '../utils/styles'
import { rhythm } from '../utils/typography'

const Block = styled.div`
  color: ${colors.midnight};
  letter-spacing: 0.2em;
  line-height: 32px;
`

const Footer = styled.footer`
  color: #666;
  width: 100%;
  height: 60px;
  display: flex;
  margin: 0 auto;
  font-size: 80%;
  overflow: hidden;
  padding-top: 6px;
  text-transform: uppercase;
  justify-content: space-between;
  border-top: 1px solid ${colors.store};

  @media all and (max-width: 860px) {
    display: block;
    padding: 0 20px;
    margin-bottom: 10px;

    ${Block} {
      font-size: 12px;
      text-align: left;
    }
  }

  @media all and (min-width: 860px) {
    width: 860px;

    ${Block} {
      line-height: normal;
    }
  }
`

export default () => {
  return (
    <Footer>
      <Block>© {new Date().getFullYear().toString()} William Lindner</Block>
      <Block>
        <a href="https://twitter.com/wlindner" target="_blank" rel="noopener">
          Twitter
        </a>{' '}
        |
        <a href="https://github.com/wlindner" target="_blank" rel="noopener">
          Github
        </a>{' '}
        |
        <a
          href="https://linkedin.com/in/wlindner"
          target="_blank"
          rel="noopener"
        >
          Linkedin
        </a>
      </Block>
    </Footer>
  )
}
