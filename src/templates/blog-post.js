import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import styled from 'styled-components'

import { rhythm, scale } from '../utils/typography'

import Layout from '../components/Layout'
import LikeButton from '../components/LikeButton'

const Title = styled.h1`
  color: black;
`

const Date = styled.p`
  font-size: ${scale(-1 / 5).fontSize};
  line-height: ${scale(-1 / 5).lineHeight};
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
`

const Content = styled.div`
  color: black;
`

const BlogPostTemplate = props => {
  const post = props.data.markdownRemark
  const siteTitle = get(props, 'data.site.siteMetadata.title')

  return (
    <Layout>
      <Helmet>
        <title>{`${post.frontmatter.title} | ${siteTitle}`}</title>
        <meta name="description" content={post.frontmatter.title} />
      </Helmet>
      <Title>{post.frontmatter.title}</Title>
      <Date>{post.frontmatter.date}</Date>
      <Content dangerouslySetInnerHTML={{ __html: post.html }} />
      <LikeButton />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
