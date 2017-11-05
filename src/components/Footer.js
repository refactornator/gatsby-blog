import React from 'react'
import styled from 'styled-components'

import { colors } from '../utils/styles'
import { rhythm } from '../utils/typography'

const Footer = styled.footer`
  height: 60px;
  width: 100%;
  font-size: 80%;
  color: #666;
  background-color: white;
  margin-top: ${rhythm(2.5)};
  overflow: hidden;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-top: 1px solid ${colors.store};
`

const Block = styled.div`
  color: ${colors.store};
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
