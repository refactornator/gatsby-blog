import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { rhythm } from '../utils/typography'

import Layout from '../components/layout'

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
    font-weight: bold;
    text-decoration: none;
  }
`

const SubTitle = styled.small`
  font-size: 14px;
`

export default class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout>
        <PostList>
          <Helmet title={siteTitle} />
          {posts.map(({ node }) => {
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
        </PostList>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
