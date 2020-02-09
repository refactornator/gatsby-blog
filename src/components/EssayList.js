import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import styled from 'styled-components'

const Container = styled.ul`
  margin: 0 auto;
  list-style-type: none;
`

const PostItem = styled.li`
  line-height: normal;
  margin: 0 20px 40px 0;
`

const Title = styled.h3`
  font-size: 24px;
  color: #0e2451;
  margin-bottom: 0;

  a {
    font-weight: bold;
    text-decoration: none;
  }
`

const SubTitle = styled.small`
  font-size: 14px;
`

export default ({ essays }) => {
  return (
    <Container>
      {essays.map(({ node }) => {
        const title = get(node, 'frontmatter.title') || node.fields.slug
        return (
          <PostItem key={node.fields.slug}>
            <Title>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </Title>
            <SubTitle>{node.frontmatter.date}</SubTitle>
          </PostItem>
        )
      })}
    </Container>
  )
}
