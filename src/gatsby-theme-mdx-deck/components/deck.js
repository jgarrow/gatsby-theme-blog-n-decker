import React from "react"
import { useThemeUI } from "theme-ui"
import mdxDeckTheme from "gatsby-theme-mdx-deck/src/gatsby-plugin-theme-ui/index"
import Deck from "gatsby-theme-mdx-deck/src/components/deck"
import merge from "deepmerge"

export default ({ theme, ...props }) => {
  const { theme: baseTheme } = useThemeUI()

  const mergedTheme = merge.all([baseTheme, mdxDeckTheme, theme])

  return <Deck theme={mergedTheme} {...props} />
}
