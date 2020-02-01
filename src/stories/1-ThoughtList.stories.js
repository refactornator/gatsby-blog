import React from 'react'
import { styled } from '@storybook/theming'

import ThoughtList from '../components/ThoughtList'

export default {
  title: 'ThoughtList',
  component: ThoughtList,
}

const Container = styled.div(({ theme }) => ({
  height: '100%',
  padding: '20px',
  background: '#f7f7f7',
}))

export const Empty = () => (
  <Container>
    <ThoughtList thoughts={[]} />
  </Container>
)

export const Single = () => (
  <Container>
    <ThoughtList
      thoughts={[
        {
          id: '255686853956469268',
          ts: 1580100836090000,
          text: 'This is a test thought',
        },
      ]}
    />
  </Container>
)

export const Many = () => (
  <Container>
    <ThoughtList
      thoughts={[
        {
          id: '255686853956469268',
          ts: 1580100836090000,
          text: 'Be kind',
        },
        {
          id: '255688960991298068',
          ts: 1580102845110000,
          text:
            'This is my thought, I have many like it, but this one is mine.',
        },
        {
          id: '255690603211260435',
          ts: 1580104411280000,
          text: 'Ok, what is this all about now?',
        },
      ]}
    />
  </Container>
)
