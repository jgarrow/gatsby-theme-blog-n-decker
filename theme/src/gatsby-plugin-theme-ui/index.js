// import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
import blogTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index"
  import decksTheme from "gatsby-theme-mdx-deck/src/gatsby-plugin-theme-ui/index"
// import merge from "deepmerge"

// export default merge.all([decksTheme, blogTheme, wavesTheme])

console.log(decksTheme)
console.log(blogTheme)

// export default { ...decksTheme }
export default { ...blogTheme}
// export default merge(blogTheme, wavesTheme)