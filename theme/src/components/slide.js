/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui"
import { Slide as OrigSlide } from "gatsby-theme-mdx-deck/src/components/slide"

const Slide = ({ theme, slide }) => {
  return (
    <ThemeProvider theme={theme}>
      <OrigSlide slide={slide} preview />
    </ThemeProvider>
  )
}

export default Slide
