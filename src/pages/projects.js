import React from 'react'
import styled, { css } from 'styled-components'

import spotsyThumbnail from '../images/projects/spotsy.png'
import zoomdataThumbnail from '../images/projects/zoomdata-logo.png'
import courierThumbnail from '../images/projects/courier.png'
import anmThumbnail from '../images/projects/anm-logo.png'
import yeomanThumbnail from '../images/projects/yeoman-gateway.png'
import addRemoveThumbnail from '../images/projects/add-remove.png'
import sevenCornersThumbnail from '../images/projects/7corners.png'

const Grid = styled.div`
  width: 100%;
  height: 1254px;
  display: flex;
  flex-flow: column wrap; /* Shorthand – you could use ‘flex-direction: column’ and ‘flex-wrap: wrap’ instead */
  justify-content: flex-start;
  align-items: flex-start;
`

const Item = styled.div`
  background-color: #f3f5f8;
  color: #7f8389;
  width: 235px;
  margin-bottom: 20px;
`

const Link = styled.a`
  display: block;
`

const Thumbnail = styled.div`
  width: 235px;
  height: 176px;
  margin-bottom: 0;
  background-color: #e1e4e9;
  background-position: center;
  background-repeat: no-repeat;
  ${props =>
    props.url &&
    css`
      background-image: url(${props.url});
    `};
`

const Name = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 0;
  padding: 27px 30px 3px 30px;
  letter-spacing: -0.025em;
`

const Type = styled.h4`
  padding: 0 30px;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Description = styled.p`
  margin: 0;
  padding: 20px 30px 40px 30px;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  letter-spacing: -0.025em;
  line-height: 1.5em;
`

const Summary = styled.div`
  margin-bottom: 40px;
`

const projects = [
  {
    name: 'Spotsy',
    type: 'iOS App',
    thumbnail: spotsyThumbnail,
    description:
      'Spotsy aims to fill the void of insightful search on the Instagram platform. The goal was to create a delightful experience through an intuitive interface, and interactions.',
  },
  {
    link: 'http://zoomdata.com',
    name: 'Zoomdata',
    type: 'Big Data Analytics',
    thumbnail: zoomdataThumbnail,
    description:
      "Big data exploration, visualization & analytics platform. I've been running frontend engineering at this company since it was formed.",
  },
  {
    name: 'Courier',
    type: 'Web App',
    thumbnail: courierThumbnail,
    description: 'Share leads with your partners.',
  },
  {
    name: 'Apartments Near Metro',
    type: 'Web App',
    thumbnail: anmThumbnail,
    description:
      'Find your place to live in the most active areas in DC. This project has been retired. Click here to read more.',
  },
  {
    link: 'https://github.com/wlindner/Yeoman-Gateway',
    name: 'Yeoman Gateway',
    type: 'Open Source',
    thumbnail: yeomanThumbnail,
    description:
      'This project aims to give you a starting point for a large Client Side MV* webapp.',
  },
  {
    link: 'http://codepen.io/wlindner/pen/IKGJi',
    name: 'Add + Remove',
    type: 'Fun',
    thumbnail: addRemoveThumbnail,
    description: 'Codepen experiment in response to a dribbble shot.',
  },
  {
    name: '7 Corners',
    type: 'Web App',
    thumbnail: sevenCornersThumbnail,
    description:
      '7 Corners Financial is a web platform for loan applications and dispersions. In a lead developer role, I focused on an experience that felt as real time as possible.',
  },
]

export default class Projects extends React.Component {
  render() {
    return (
      <Grid>
        {projects.map(project => {
          return (
            <Item key={project.name}>
              <Link href={project.link} target="_blank">
                <Thumbnail url={project.thumbnail} />
                <Name>{project.name}</Name>
              </Link>
              <Type>{project.type}</Type>
              <Description>{project.description}</Description>
            </Item>
          )
        })}
      </Grid>
    )
  }
}
