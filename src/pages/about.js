import React from 'react'
import styled from 'styled-components'

import face from '../images/face.jpg'

import Layout from '../components/Layout'

const Summary = styled.div`
  margin-bottom: 40px;

  @media all and (max-width: 860px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  float: right;
  border-radius: 50%;
`

export default class About extends React.Component {
  render() {
    return (
      <Layout>
        <Summary>
          <Avatar src={face} alt={`William Lindner`} />
          <p>
            I'm a software engineer living in San Francisco. I enjoy exploring
            the bay area, reading philosophy and listening to podcasts. I also
            enjoy improv and kickboxing.
          </p>
          <p>
            I taught myself to code with Python, Perl, and PHP. I studied
            Computer Science using Java and C++ at Virginia Tech. And I've been
            making websites since before it was cool.
          </p>
          <p>
            I co-founded <a href="http://zoomdata.com">Zoomdata</a>. A Big Data
            visualization company. I wrote mostly Javascript and managed a team
            of frontend engineers building the Web UI and doing R&D. Now I work
            at <a href="http://pivotal.io/">Pivotal</a>. Practicing Test Driven
            Development, Pair Programming, and ping-pong.
          </p>
        </Summary>
      </Layout>
    )
  }
}
