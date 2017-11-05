import React from 'react'
import styled from 'styled-components'

import face from '../images/face.jpg'
import { rhythm } from '../utils/typography'

const Summary = styled.div`
  margin-bottom: 40px;
`

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  float: right;
  margin-left: 40px;
  margin-bottom: 40px;
  border-radius: 50%;
`

export default class About extends React.Component {
  render() {
    return (
      <Summary>
        <Avatar src={face} alt={`William Lindner`} />
        <p>
          I'm a software engineer living in San Francisco. I enjoy exploring the
          bay area, reading philosophy and listening to podcasts. I also enjoy
          improv and kickboxing.
        </p>
        <p>
          I taught myself to code with Python, Perl, and PHP. I studied Computer
          Science using Java and C++ at Virginia Tech. And I've been making
          websites since before it was cool.
        </p>
        I co-founded <a href="http://zoomdata.com">Zoomdata</a>. A Big Data
        visualization company. I wrote mostly Javascript and managed a team of
        frontend engineers building the Web UI and doing R&D. Now I work at{' '}
        <a href="http://pivotal.io/">Pivotal</a>. Practicing Test Driven
        Development, Pair Programming, and ping-pong.
      </Summary>
    )
  }
}
