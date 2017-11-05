import $ from 'jquery'
import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import MobileDetect from 'mobile-detect'

import { colors } from '../utils/styles'
import { rhythm } from '../utils/typography'

import { initialize, startAnimation, stopAnimation } from '../utils/header'

import logo from '../images/wl3_logo.png'

const Background = styled.header`
  height: 120px;
  background: #f3f5f8;
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-weight: bold;
    text-decoration: none;
  }

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  circle,
  line,
  path {
    fill: none;
    stroke: white;
    transform-origin: center center;

    /*Set our animation play state to paused initially */
    animation-play-state: paused !important;
  }

  circle {
    stroke-width: 2px;
  }

  line {
    stroke-width: 3px;
  }

  path {
    stroke-width: 2px;
    stroke-linecap: round;
  }

  .playing {
    animation-play-state: running !important;
  }

  @keyframes growShrink {
    from {
      transform: none;
    }
    50% {
      transform: scale(1.5);
    }
    to {
      transform: none;
    }
  }

  @keyframes spin {
    from {
      transform: none;
    }
    50% {
      transform: rotate(360deg);
    }
    to {
      transform: none;
    }
  }

  @keyframes lineDisappear {
    from {
      stroke-dashoffset: null;
    }
    50% {
      stroke-dashoffset: 50;
    }
    to {
      stroke-dashoffset: null;
    }
  }

  @keyframes lineCrawl {
    from {
      stroke-dashoffset: null;
    }
    50% {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: null;
    }
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

export default class Header extends React.Component {
  componentDidMount() {
    const mobileDetect = new MobileDetect(window.navigator.userAgent)

    initialize()
    if (mobileDetect.mobile()) {
      startAnimation()
    }
  }

  render() {
    return (
      <Background onMouseEnter={startAnimation} onMouseLeave={stopAnimation}>
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
        <svg />
      </Background>
    )
  }
}
