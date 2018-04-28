import React, { Component } from 'react'
import styled from 'styled-components'
import { random, range, debounce } from 'lodash'
import { easings, animations } from '../utils/styles'

const { growShrink, spin, lineDisappear, lineCrawl } = animations

const duration = 3000

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
    stroke: white;
  }

  @media (min-width: 400px) {
    circle,
    line,
    path {
      animation-play-state: ${props => (props.animate ? 'running' : 'paused')};
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
  transform-origin: ${props => props.cx}px ${props => props.cy}px;
  animation: ${growShrink} ${props => props.duration}ms ${easings.inOutQuart}
    infinite;
`

const AnimatedStepPath = styled.path`
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-dasharray: ${props => props.dashArray};
  stroke-dashoffset: ${props => props.dashArray / 2 * -1};
  animation: ${lineCrawl} ${props => props.duration}ms linear infinite;
`

const AnimatedSquigglyPath = styled.path`
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-dasharray: 80;
  animation: ${lineDisappear} ${props => props.duration}ms ${easings.inOutQuart}
    infinite;
`

const CrossLine = styled.line`
  stroke-width: 3px;
  animation: ${spin} ${props => props.duration}ms ease-in-out infinite;
  transform-origin: ${props => props.size / 2}px ${props => props.size / 2}px;
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
    let angle = i / curveWidth * Math.PI * 2 // angle = 0 -> 2π
    let x = angle * curveWidth / (Math.PI * 2)
    let y = Math.sin(angle) * (height / 2) + height / 2
    x += xOffset
    y += yOffset
    // M = move to, L = line to
    path.push((i == 0 ? 'M' : 'L') + x + ',' + y)
  }
  return path.join(' ')
}

const generateCircles = (width, height) => {
  const blockWidth = 120
  const count = Math.round(width / blockWidth)

  return range(count).map(index => {
    const r = random(8, 14)

    const xMin = blockWidth * index
    const xMax = blockWidth * (index + 1)

    const yMin = index % 2 == 0 ? height / 8 + r : height / 2
    const yMax = index % 2 == 0 ? height / 2 : height - height / 8 - r

    return {
      r,
      cx: random(xMin, xMax),
      cy: random(yMin, yMax),
      duration: random(duration / 1.2, duration * 1.2),
    }
  })
}

const generateSteps = (width, height) => {
  const blockWidth = 240
  const count = Math.round(width / blockWidth)

  return range(count).map(index => {
    const xMin = blockWidth * index
    const xMax = blockWidth * (index + 1)
    const xStart = random(xMin, xMax)

    const stepSize = random(10, 20)
    const numberOfSteps = height / stepSize

    return {
      d: constructStepPath(xStart, stepSize, numberOfSteps),
      dashArray: random(numberOfSteps * 0.5, numberOfSteps) * stepSize * 2,
      duration: random(duration * 2, duration * 2.5),
    }
  })
}

const generateSquigglies = (width, height) => {
  const blockWidth = 240
  const count = Math.round(width / blockWidth)

  return range(count).map(index => {
    const squigglyWidth = random(40, 80)
    const squigglyHeight = random(5, 10)
    const xMin = blockWidth * index
    const xMax = blockWidth * (index + 1)
    const xOffset = random(xMin, xMax)

    const yMin = index % 2 == 0 ? height / 8 + squigglyHeight : height / 2
    const yMax =
      index % 2 == 0 ? height / 2 : height - height / 8 - squigglyHeight
    const yOffset = random(yMin, yMax)

    return {
      d: constructSquigglyPath(xOffset, yOffset, squigglyWidth, squigglyHeight),
      duration: random(duration * 2, duration * 2.5),
    }
  })
}

const generateCrosses = (width, height) => {
  const blockWidth = 120
  const offset = blockWidth / 2
  const count = Math.round(width / blockWidth)

  return range(count).map(index => {
    const size = random(14, 20)

    const xMin = blockWidth * index + offset
    const xMax = blockWidth * (index + 1) + offset

    const yMin = index % 2 == 1 ? size : height / 2
    const yMax = index % 2 == 1 ? height / 2 : height - height / 8 - size

    return {
      size,
      x: random(xMin, xMax),
      y: random(yMin, yMax),
      duration: random(duration / 1.2, duration * 1.2),
    }
  })
}

class AnimatedShapes extends Component {
  constructor(props) {
    super(props)

    this.state = this.generateState(props)
  }

  generateState(props) {
    const { width, height } = props

    return {
      width,
      height,
      circles: generateCircles(width, height),
      steps: generateSteps(width, height),
      squigglies: generateSquigglies(width, height),
      crosses: generateCrosses(width, height),
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { width: renderedWidth } = this.state
    const { width: currentWidth } = this.props

    if (Math.abs(currentWidth - renderedWidth) > 150) {
      this.setState(this.generateState(this.props))
    }
  }

  render() {
    const { animate } = this.props
    const { width, circles, steps, squigglies, crosses } = this.state

    return (
      <Svg animate={animate}>
        {circles.map((props, index) => {
          return <AnimatedCircle key={`circle-${index}`} {...props} />
        })}
        {steps.map((props, index) => {
          return <AnimatedStepPath key={`steps-${index}`} {...props} />
        })}
        {squigglies.map((props, index) => {
          return <AnimatedSquigglyPath key={`squigglies-${index}`} {...props} />
        })}
        {crosses.map((props, index) => {
          return <AnimatedCross key={`cross-${index}`} {...props} />
        })}
      </Svg>
    )
  }
}

export default AnimatedShapes
