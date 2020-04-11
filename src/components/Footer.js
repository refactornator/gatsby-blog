import React from 'react'
import styled from 'styled-components'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

import { colors } from '../utils/styles'

const Footer = styled.footer`
  width: 100%;
  height: 70px;
  overflow: hidden;
  background-color: #f3f5f8;
  border-top: 1px solid ${colors.store};
`

const Content = styled.div`
  color: #666;
  display: flex;
  margin: 0 auto;
  padding-top: 6px;
  text-transform: uppercase;
  justify-content: center;
`

const Attribution = styled.div`
  color: ${colors.midnight};
  text-align: center;
`

const IconWrapper = styled.div`
  width: 142px;
  color: ${colors.midnight};
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default () => {
  return (
    <Footer>
      <Content>
        <Attribution>
          © {new Date().getFullYear().toString()} William Lindner
        </Attribution>
        <IconWrapper>
          <a href="https://twitter.com/wlindner" target="_blank" rel="noopener">
            <TwitterIcon />
          </a>
          <a href="https://github.com/wlindner" target="_blank" rel="noopener">
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com/in/wlindner"
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
          </a>
        </IconWrapper>
      </Content>
    </Footer>
  )
}
