import React from 'react'
import { styled } from '@storybook/theming'

import Feedback from '../components/Feedback'

export default {
  title: 'FeedbackBox',
}

const Container = styled.div(({ theme }) => ({
  width: '800px',
  height: '100%',
  margin: '20px auto 0 auto',
}))

export const Basic = () => (
  <Container>
    <Feedback />
  </Container>
)
