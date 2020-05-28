/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `My Talks`,
    author: `Janessa Garrow`,
    description: `A home for both your blog posts and slide decks from your talks and presentations`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/janessagarrow`,
      },
      {
        name: `github`,
        url: `https://github.com/jgarrow/gatsby-theme-deck-n-blog`,
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-theme-deck-n-blog",
      options: {
        contentPath: "decks",
        blogBasePath: "/posts", // needs to have the forward slash to avoid gatsby Link error message
        decksBasePath: "/slides", // needs to have forward slash to properly create and update url
      },
    },
  ],
}
