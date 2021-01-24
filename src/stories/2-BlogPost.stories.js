import React from 'react'
import { styled } from '@storybook/theming'
import { HelmetProvider } from 'react-helmet'

import BlogPostTemplate from '../templates/blog-post'

export default {
  title: 'BlogPost',
  component: BlogPostTemplate,
  decorators: [storyFn => <HelmetProvider>{storyFn()}</HelmetProvider>],
}

const Container = styled.div(({ theme }) => ({
  height: '100%',
}))

export const Basic = () => (
  <Container>
    <BlogPostTemplate
      data={{
        site: { siteMetadata: { title: 'This is the site title' } },
        markdownRemark: {
          html:
            '<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Morbi tempus iaculis urna id volutpat lacus laoreet non. Fringilla est ullamcorper eget nulla facilisi etiam. At tellus at urna condimentum mattis pellentesque id. Tortor id aliquet lectus proin. Tempus iaculis urna id volutpat lacus laoreet non. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Blandit libero volutpat sed cras ornare arcu dui. A lacus vestibulum sed arcu non odio. Risus feugiat in ante metus dictum at. Volutpat lacus laoreet non curabitur gravida. Id ornare arcu odio ut. Dignissim enim sit amet venenatis urna cursus eget nunc. Enim nec dui nunc mattis enim ut tellus elementum sagittis. Egestas diam in arcu cursus euismod quis viverra nibh cras. Sit amet est placerat in egestas erat imperdiet sed euismod. Auctor urna nunc id cursus metus aliquam eleifend.</p><p>Vitae elementum curabitur vitae nunc sed velit dignissim. Nisi vitae suscipit tellus mauris a diam maecenas sed. Mauris ultrices eros in cursus. Amet nisl purus in mollis nunc sed id. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Facilisis leo vel fringilla est ullamcorper eget nulla. Amet consectetur adipiscing elit duis. Non arcu risus quis varius quam quisque id diam vel. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet cursus sit amet dictum sit amet justo donec enim.</p></div>',
          frontmatter: {
            title: 'This is the blog post title',
            date: 'January 20, 2020',
          },
        },
      }}
    />
  </Container>
)
