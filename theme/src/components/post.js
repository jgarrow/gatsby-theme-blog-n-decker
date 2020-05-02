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

    // extract form data
    const formdata = new FormData(e.target)

    // convert FormData to json object
    // SOURCE: https://stackoverflow.com/a/46774073
    const json = {}
    formdata.forEach(function (value, prop) {
      json[prop] = value
    })

    // convert json to urlencoded query string
    // SOURCE: https://stackoverflow.com/a/37562814 (comments)
    const formBody = Object.keys(json)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
      )
      .join("&")

    // POST the request to Staticman's API endpoint
    const response = await fetch(
      "https://deck-n-blog-comments.herokuapp.com/v2/entry/jgarrow/gatsby-theme-deck-n-blog/master/comments/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      }
    )
      .then((res) => {
        // reset form
        document.getElementById("comment-form").reset()
        // display success message
        document.getElementById("success").style.display = "block"
      })
      .catch((error) => {
        console.log(error)
        document.getElementById("failure").style.display = "block"
      })

    console.log("response: ", response)
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
        <Box
          as="form"
          onSubmit={handleSubmit}
          // method="POST"
          // action="https://deck-n-blog-comments.herokuapp.com/v2/entry/jgarrow/gatsby-theme-deck-n-blog/master/comments/"
        >
          <Label htmlFor="fields[name]">Name</Label>
          <Input
            name="name"
            type="text"
            mb={3}
            onChange={handleChange}
            required
          />
          <Label htmlFor="message">Comment</Label>
          <Textarea
            name="message"
            rows="6"
            mb={3}
            onChange={handleChange}
            required
          />
          <div
            className="g-recaptcha"
            data-sitekey="6Ld_PfEUAAAAAJQX_kD8eYwSI53qJPcFfE9M4Vpv"
          ></div>
          <Button type="submit">Submit</Button>
        </Box>
      </main>
      <PostFooter {...{ previous, next }} />
    </Layout>
    // </ThemeProvider>
  )
}

export default Post
