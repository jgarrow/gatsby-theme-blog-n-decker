import React, { useState } from "react"
import {
  Styled,
  css,
  ThemeProvider,
  ColorMode,
  InitializeColorMode,
} from "theme-ui"

import { Label, Input, Textarea, Button, Box } from "@theme-ui/components"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"
// import { FacebookProvider, Comments } from "react-facebook"

import blogTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index"
import waves from "gatsby-theme-deck-n-blog/src/components/waves"
import Body from "gatsby-theme-deck-n-blog/src/components/body"
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
  const [comment, setComment] = useState({
    name: "",
    comment: "",
  })

  if (previous) {
    previous.slug = `${previous.slug}`
  }

  if (next) {
    next.slug = `${next.slug}`
  }

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formdata = new FormData()
    formdata.set("fields[name]", comment.name)
    formdata.set("fields[message]", comment.message)
    const json = {}
    formdata.forEach((value, prop) => (json[prop] = value))
    const formBody = Object.keys(json)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
      )
      .join("&")

    // in the repo, create a folder named 'comments'
    const response = await fetch(
      "https://deck-n-blog-comments.herokuapp.com/v2/entry/jgarrow/gatsby-theme-deck-n-blog/master/comments/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      }
    )
    console.log(response)
  }

  console.log(
    "deepmerge(blogTheme, { styles: { waves } }): ",
    deepmerge(blogTheme, { styles: { waves } })
  )

  return (
    // <ThemeProvider theme={deepmerge(blogTheme, { styles: { waves } })}>
    // {/* <ThemeProvider theme={blogTheme}> */}
    // {/* <ColorMode /> */}
    // <InitializeColorMode />
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
          {post.date} hello
        </Styled.p>
        <Body body={post.body} />
        {/* <FacebookProvider appId="123456789">
            <Comments href="http://www.facebook.com" />
          </FacebookProvider> */}
        <Box as="form" onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input name="name" mb={3} onChange={handleChange} />
          <Label htmlFor="comment">Comment</Label>
          <Textarea name="comment" rows="6" mb={3} onChange={handleChange} />
          <div
            className="g-recaptcha"
            data-sitekey="6Ld_PfEUAAAAAJQX_kD8eYwSI53qJPcFfE9M4Vpv"
          ></div>
          <Button>Submit</Button>
        </Box>
      </main>
      <PostFooter {...{ previous, next }} />
    </Layout>
    // </ThemeProvider>
  )
}

export default Post
