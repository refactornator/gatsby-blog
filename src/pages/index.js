import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { rhythm } from '../utils/typography'

import '../utils/header'

const PostList = styled.ul`
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
    text-decoration: none;
  }
`

export default class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <PostList>
        <Helmet title={siteTitle} />
        {posts.map(post => {
          if (post.node.frontmatter.path !== '/404/') {
            const title = get(post, 'node.frontmatter.title') || post.node.path
            return (
              <PostItem key={post.node.frontmatter.path}>
                <Title>
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={post.node.frontmatter.path}
                  >
                    {title}
                  </Link>
                </Title>
                <small>{post.node.frontmatter.date}</small>
              </PostItem>
            )
          }
        })}
      </PostList>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
