/** @jsx jsx */
import { Styled, css, jsx } from "theme-ui"
import { Fragment } from "react"
import { Link } from "gatsby"

import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"
import Footer from "gatsby-theme-blog/src/components/home-footer"

const Home = ({ location, deckposts, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <main>
      {deckposts.map((deckpost) => {
        const keywords = deckpost.keywords || []
        return (
          <Fragment key={deckpost.postSlug}>
            <SEO title="Home" keywords={keywords} />
            <div>
              <Styled.h2
                css={css({
                  mb: 1,
                })}
              >
                <Styled.a
                  as={Link}
                  css={{
                    textDecoration: `none`,
                  }}
                  to={deckpost.postSlug}
                >
                  {deckpost.title} Post
                </Styled.a>
                {" | "}
                <Styled.a
                  as={Link}
                  css={{
                    textDecoration: `none`,
                  }}
                  to={deckpost.deckSlug}
                >
                  Slides
                </Styled.a>
              </Styled.h2>
              <small>{deckpost.date}</small>
              <Styled.p>{deckpost.excerpt}</Styled.p>
            </div>
          </Fragment>
        )
      })}
    </main>
    <Footer socialLinks={socialLinks} />
  </Layout>
)

export default Home
