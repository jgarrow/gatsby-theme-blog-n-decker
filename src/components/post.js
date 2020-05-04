/** @jsx jsx */
import { Styled, css, jsx } from "theme-ui"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"

import Body from "./body"

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
  return (
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
        <Body body={post.body} />
      </main>
      <PostFooter {...{ previous, next }} />
    </Layout>
  )
}

export default Post
