import React from "react"
import {
  Styled,
  css,
  ThemeProvider,
  ColorMode,
  InitializeColorMode,
  Label,
  Input,
  Textarea,
  Button,
  Box,
} from "theme-ui"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"
// import { FacebookProvider, Comments } from "react-facebook"

import blogTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index"
import waves from "./waves"
import Body from "./body"
import deepmerge from "deepmerge"

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  if (previous) {
    previous.slug = `${previous.slug}`
  }

  if (next) {
    next.slug = `${next.slug}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <ThemeProvider theme={deepmerge(blogTheme, { styles: { waves } })}>
      {/* <ColorMode /> */}
      <InitializeColorMode />
      <Layout location={location} title={title}>
        <SEO title={post.title} description={post.excerpt} />
        <main>
          <Styled.h1>{post.title}</Styled.h1>
          <Styled.p
            css={css({
              fontSize: 1,
              mt: -3,
              mb: 3,
            })}
          >
            {post.date}
          </Styled.p>
          <Body body={post.body} /> hello123
          {/* <FacebookProvider appId="123456789">
            <Comments href="http://www.facebook.com" />
          </FacebookProvider> */}
          <Box as="form" onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input name="name" mb={3} />
            <Label htmlFor="comment">Comment</Label>
            <Textarea name="comment" rows="6" mb={3} />
            <Button>Submit</Button>
          </Box>
        </main>

        <PostFooter {...{ previous, next }} />
      </Layout>
    </ThemeProvider>
  )
}

export default Post
