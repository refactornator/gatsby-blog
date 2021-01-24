import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import EssayList from '../components/EssayList'

const Essays = ({ data }) => {
  const { title } = data.site.siteMetadata
  const { edges } = data.allMarkdownRemark

  return (
    <Layout title={title}>
      <EssayList essays={edges} />
    </Layout>
  )
}
export default Essays;

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
