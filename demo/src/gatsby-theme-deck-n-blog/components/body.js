/** @jsx jsx */
import { jsx, ThemeProvider, useThemeUI, InitializeColorMode } from "theme-ui"
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import {
  Intro,
  Content,
} from "gatsby-theme-deck-n-blog/src/components/placeholders"

import splitSlides from "gatsby-theme-mdx-deck/src/split-slides"
import Slide from "gatsby-theme-mdx-deck/src/components/slide"
import Zoom from "gatsby-theme-mdx-deck/src/components/zoom"

import Wave from "gatsby-theme-waves/src/components/wave"
import waves from "gatsby-theme-deck-n-blog/src/components/waves"
import BarScroller from "gatsby-theme-waves/src/components/bar-scroller"
import deepmerge from "deepmerge"
import blogTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index"

import { Helmet } from "react-helmet"

function getIntro(children) {
  const introElement = React.Children.toArray(children).find(
    c => c.props && c.props.originalType === Intro
  )
  return introElement && introElement.props && introElement.props.children
}

function getContent(children) {
  const contentElement = React.Children.toArray(children).find(
    c => c.props && c.props.originalType === Content
  )
  return React.createElement(
    "div",
    {},
    contentElement && contentElement.props && contentElement.props.children
  )
}

const GoogleFont = ({ theme }) => {
  if (!theme.googleFont) return false
  return (
    <Helmet>
      <link rel="stylesheet" href={theme.googleFont} />
    </Helmet>
  )
}

const Wrapper = ({ children, theme = {}, ...props }) => {
  function childrenToColumns(children) {
    const slides = splitSlides({ children })
    const contents = slides.map(getContent)

    const slideElements = slides
      .map(slide =>
        slide.filter(
          c =>
            !c.props ||
            c.props.originalType !== Intro ||
            c.props.originalType !== Content
        )
      )
      .map((slide, i) => (
        <ThemeProvider theme={{ ...blogTheme, ...theme }} key={i}>
          <InitializeColorMode />
          <Zoom zoom={1} ratio={16 / 9}>
            <Slide slide={slide} preview />
          </Zoom>
        </ThemeProvider>
      ))

    return [slideElements, contents]
  }

  const intro = getIntro(children)

  return (
    <div>
      <GoogleFont theme={theme} />
      nice {intro}
      <Wave
        columnComponents={[DeckSticker, BarScroller]}
        childrenToStepColumns={childrenToColumns}
      >
        {children}
      </Wave>
    </div>
  )
}

function DeckSticker({ steps, progress, variant, currentStep }) {
  const prevIndex = Math.floor(progress)
  const nextIndex = prevIndex + 1
  return (
    <div sx={{ variant: `styles.waves.${variant}.StickerContainer` }}>
      <div sx={{ variant: `styles.waves.${variant}.Sticker` }}>
        <div
          style={{ transform: `translateY(${(prevIndex - progress) * 50}%)` }}
        >
          {steps[prevIndex]}
          {steps[nextIndex]}
        </div>
      </div>
    </div>
  )
}

const Body = ({ body }) => {
  const context = useThemeUI()
  const { theme } = context

  return (
    <ThemeProvider theme={deepmerge(theme, { styles: { waves } })}>
      <MDXRenderer components={{ wrapper: Wrapper }}>{body}</MDXRenderer>
    </ThemeProvider>
  )
}

export default Body
