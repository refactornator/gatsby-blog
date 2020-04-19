import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import GitHubIcon from '@material-ui/icons/GitHub'

import AnimatedShapes from './AnimatedShapes'

const Background = styled.header`
  top: 0;
  width: 100%;
  height: 120px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: #829fd9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  a {
    font-weight: bold;
    text-decoration: none;
  }
`

const Links = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

const MenuItem = styled.h1`
  margin: auto;
  padding: 2px 6px;
  text-align: center;
`

const linkStyle = {
  fontSize: 22,
  color: 'white',
  margin: '0 16px',
  minWidth: '48px',
  minHeight: '48px',
  fontWeight: 'bolder',
  backgroundColor: '#f99645',
}

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animate: false,
    }
  }

  render() {
    const { animate } = this.state

    return (
      <Background
        onMouseOver={() => this.setState({ animate: true })}
        onMouseOut={() => this.setState({ animate: false })}
      >
        <Links>
          <Link
            style={{
              ...linkStyle,
            }}
            to={'/'}
          >
            <MenuItem>Home</MenuItem>
          </Link>
          <a
            target="_blank"
            style={{
              ...linkStyle,
              borderRadius: '50%',
            }}
            href="https://github.com/wlindner"
          >
            <MenuItem>
              <GitHubIcon fontSize="medium" />
            </MenuItem>
          </a>
        </Links>
        <AnimatedShapes animate={animate} />
      </Background>
    )
  }
}

export default Header
