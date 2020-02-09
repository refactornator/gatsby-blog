import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'

import Layout from '../components/Layout'
import EssayList from '../components/EssayList'

export default ({ data }) => {
  const { title } = data.site.siteMetadata
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <Helmet title={title} />
      <EssayList essays={edges} />
    </Layout>
  )
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
