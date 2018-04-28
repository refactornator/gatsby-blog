import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import sizeMe from 'react-sizeme'

import { colors } from '../utils/styles'
import { rhythm } from '../utils/typography'

import AnimatedShapes from './AnimatedShapes'

import logo from '../images/wl3_logo.png'

const Background = styled.header`
  height: 120px;
  display: flex;
  position: relative;
  background: #f3f5f8;
  align-items: center;
  justify-content: center;

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

const linkStyle = {
  color: '#aaa',
  width: '26%',
  maxWidth: '200px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const Image = styled.img`
  margin-bottom: 5px;
  vertical-align: middle;
`

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animate: false,
    }
  }

  render() {
    const { animate } = this.state
    const { width } = this.props.size

    return (
      <Background
        onMouseOver={() => this.setState({ animate: true })}
        onMouseOut={() => this.setState({ animate: false })}
      >
        <Links>
          <Link
            style={{ ...linkStyle, justifyContent: 'flex-end' }}
            to={'/about/'}
          >
            About
          </Link>
          <Link style={linkStyle} to={'/'}>
            <Image src={logo} />
          </Link>
          <Link
            style={{ ...linkStyle, justifyContent: 'flex-start' }}
            to={'/projects/'}
          >
            Projects
          </Link>
        </Links>
        <AnimatedShapes animate={animate} width={width} height={120} />
      </Background>
    )
  }
}

export default sizeMe({ monitorWidth: true })(Header)
