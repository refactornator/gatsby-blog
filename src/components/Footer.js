import React from 'react'
import styled from 'styled-components'

import { colors } from '../utils/styles'
import { rhythm } from '../utils/typography'

const Footer = styled.footer`
  color: #666;
  width: 100%;
  height: 60px;
  display: flex;
  margin: 0 auto;
  font-size: 80%;
  overflow: hidden;
  background-color: white;
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

const Block = styled.div`
  color: ${colors.snuggles};
  letter-spacing: 0.2em;
  line-height: 32px;
`

export default () => {
  return (
    <Footer>
      <Block>© {new Date().getFullYear().toString()} William Lindner</Block>
      <Block>
        <a target="_blank" href="https://twitter.com/wlindner">
          Twitter
        </a>{' '}
        |
        <a target="_blank" href="https://github.com/wlindner">
          Github
        </a>{' '}
        |
        <a target="_blank" href="https://linkedin.com/in/wlindner">
          Linkedin
        </a>
      </Block>
    </Footer>
  )
}
