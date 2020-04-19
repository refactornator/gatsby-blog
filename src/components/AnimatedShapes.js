import React, { Component } from 'react'
import styled from 'styled-components'

import { easings, animations } from '../utils/styles'
const { growShrink, spin, lineDisappear, lineCrawl } = animations

const Svg = styled.svg`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;

  circle,
  line,
  path {
    fill: none;
    stroke: #ced1d6;
  }

  @media (min-width: 400px) {
    circle,
    line,
    path {
      animation-play-state: ${(props) =>
        props.animate ? 'running' : 'paused'};
    }
  }

  @media (max-width: 400px) {
    circle,
    line,
    path {
      animation-play-state: running;
    }
  }
`

const AnimatedCircle = styled.circle`
  stroke-width: 2px;
  transform-origin: ${(props) => props.cx}px ${(props) => props.cy}px;
  animation: ${growShrink} ${(props) => props.duration}ms ${easings.inOutQuart}
    infinite;
`

const AnimatedStepPath = styled.path`
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => props.dashArray};
  stroke-dashoffset: ${(props) => props.dashArray * 0.75};
  animation: ${lineCrawl} ${(props) => props.duration}ms linear infinite;
`

const AnimatedSquigglyPath = styled.path`
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => props.dashArray};
  animation: ${lineDisappear} ${(props) => props.duration}ms
    ${easings.inOutQuart} infinite;
`

const CrossLine = styled.line`
  stroke-width: 3px;
  animation: ${spin} ${(props) => props.duration}ms ease-in-out infinite;
  transform-origin: ${(props) => props.size / 2}px
    ${(props) => props.size / 2}px;
`

const AnimatedCross = ({ x, y, size, duration }) => {
  return (
    <g transform={`translate(${x} ${y})`}>
      <CrossLine
        x1={0}
        y1={0}
        x2={size}
        y2={size}
        size={size}
        duration={duration}
      />
      <CrossLine
        x1={0}
        y1={size}
        x2={size}
        y2={0}
        size={size}
        duration={duration}
      />
    </g>
  )
}

function constructStepPath(xOffset, stepSize, numberOfSteps) {
  const path = []
  for (let i = 0; i < numberOfSteps; i++) {
    let x = xOffset + i * stepSize
    let y = i * stepSize
    path.push((i == 0 ? 'M' : 'L') + x + ',' + y)

    x = xOffset + i * stepSize
    y = (i + 1) * stepSize
    path.push('L' + x + ',' + y)
  }
  return path.join(' ')
}

function constructSquigglyPath(xOffset, yOffset, width, height) {
  const curveWidth = 20
  const path = []
  for (let i = 0; i <= width; i++) {
    let angle = (i / curveWidth) * Math.PI * 2 // angle = 0 -> 2π
    let x = (angle * curveWidth) / (Math.PI * 2)
    let y = Math.sin(angle) * (height / 2) + height / 2
    x += xOffset
    y += yOffset
    // M = move to, L = line to
    path.push((i == 0 ? 'M' : 'L') + x + ',' + y)
  }
  return path.join(' ')
}

class AnimatedShapes extends Component {
  render() {
    const { animate } = this.props

    return (
      <Svg animate={animate}>
        <defs>
          <pattern
            id="shapes"
            width="240"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <AnimatedCircle r={14} cx={24} cy={10} duration={2000} />
            <AnimatedCircle r={16} cx={40} cy={100} duration={1500} />
            <AnimatedCircle r={18} cx={210} cy={70} duration={3000} />
            <AnimatedStepPath
              d={constructStepPath(60, 20, 10)}
              dashArray={240}
              duration={4000}
            />
            <AnimatedSquigglyPath
              d={constructSquigglyPath(45, 60, 120, 10)}
              dashArray={80}
              duration={3500}
            />
            <AnimatedSquigglyPath
              d={constructSquigglyPath(160, 100, 120, 20)}
              dashArray={20}
              duration={4000}
            />
            <AnimatedCross size={12} x={210} y={10} duration={5000} />
            <AnimatedCross size={20} x={130} y={16} duration={4500} />
            <AnimatedCross size={16} x={80} y={90} duration={5500} />
            <AnimatedCross size={14} x={16} y={50} duration={5000} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#shapes)" />
      </Svg>
    )
  }
}

export default AnimatedShapes
