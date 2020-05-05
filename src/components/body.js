/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui"
import React, { Fragment } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Intro, Content } from "./placeholders"
import splitSlides from "gatsby-theme-mdx-deck/src/split-slides"

import Slide from "./slide"
import Zoom from "gatsby-theme-mdx-deck/src/components/zoom"

import Wave from "gatsby-theme-waves/src/components/wave"
import waves from "./waves"
import BarScroller from "gatsby-theme-waves/src/components/bar-scroller"
import decksTheme from "gatsby-theme-mdx-deck/src/gatsby-plugin-theme-ui/index"

import { Helmet } from "react-helmet"

function getIntro(children) {
  const introElement = React.Children.toArray(children).find(
    (c) => c.props && c.props.originalType === Intro
  )
  return introElement && introElement.props && introElement.props.children
}

function getContent(children) {
  const contentElement = React.Children.toArray(children).find(
    (c) => c.props && c.props.originalType === Content
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
      .map((slide) =>
        slide.filter(
          (c) =>
            !c.props ||
            (c.props.originalType !== Intro && c.props.originalType !== Content)
        )
      )
      .map((filteredSlide, i) => {
        // if a slide has a Zoom component with a value prop provided, set the Zoom zoom prop to that value, otherwise set it to 1
        const zoomObj = filteredSlide.find(
          (slideObj) => slideObj.props.mdxType === "Zoom"
        )

        return (
          <Fragment key={i}>
            <Zoom zoom={zoomObj ? zoomObj.props.value : 1} ratio={16 / 9}>
              <Slide slide={filteredSlide} theme={theme} preview />
            </Zoom>
          </Fragment>
        )
      })
    return [slideElements, contents]
  }

  const intro = getIntro(children)
  return (
    <div>
      <GoogleFont theme={theme} />
      {intro}
      <Wave
        columnComponents={[DeckSticker, BarScroller]}
        childrenToStepColumns={childrenToColumns}
      >
        {children}
      </Wave>
    </div>
  )
}

function DeckSticker({ steps, progress, variant, currentStep, ...rest }) {
  const prevIndex = Math.floor(progress)
  const nextIndex = prevIndex + 1
  return (
    <ThemeProvider theme={decksTheme}>
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
    </ThemeProvider>
  )
}

const Body = ({ body }) => {
  return (
    <ThemeProvider theme={{ styles: { waves } }}>
      <MDXRenderer components={{ wrapper: Wrapper }} body={body}>
        {body}
      </MDXRenderer>
    </ThemeProvider>
  )
}

export default Body
