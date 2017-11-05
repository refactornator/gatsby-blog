import React from 'react'

import face from '../images/face.jpg'
import { rhythm } from '../utils/typography'

export default class About extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={face}
          alt={`William Lindner`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          I'm a software engineer living in San Francisco. I enjoy exploring the
          bay area, reading philosophy and listening to podcasts. I also enjoy
          improv and kickboxing.
          <br />
          I taught myself to code with Python, Perl, and PHP. I studied Computer
          Science using Java and C++ at Virginia Tech. And I've been making
          websites since before it was cool.
          <br />
          I co-founded [Zoomdata](http://zoomdata.com) (a Big Data visualization
          company) where I wrote mostly Javascript and managed a team of
          frontend engineers building the Web UI and doing R&D.
          <br />
          Now I work at [Pivotal](http://pivotal.io/). Practicing Test Driven
          Development, Pair Programming, and ping-pong.
        </p>
      </div>
    )
  }
}
