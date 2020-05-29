# Deck 'n' Blog

You write the MDX for your [mdx-deck](https://github.com/jxnblk/mdx-deck)s, and this Gatsby theme creates the deck and the blog post for you.

## Installation

To use this theme in your Gatsby sites, follow these instructions:

1. Init your Gatsby site. Install the version of gatsby-theme-deck-n-blog from this repo, not the one published on npm. Since `master` has the demo repo in it as well, install the `theme` branch that excludes `demo`.

   ```sh
   mkdir my-gastby-site
   cd my-gastby-site
   npm install --save react react-dom gatsby jgarrow/gatsby-theme-deck-n-blog#theme
   npm init -y
   ```

2. Create `gatsby-config.js`:

   ```js
   module.exports = {
     plugins: ["gatsby-theme-deck-n-blog"],
   }
   ```

3. Create a deck in `decks/my-deck.mdx`

   ```md
   ---
   title: The Title
   date: 1986-02-20
   ---

   import { Intro, Content, Zoom } from "gatsby-theme-deck-n-blog"

   <Intro>

   This will only appear in the blog post as an intro an as the excerpt.

   </Intro>

   # Slide 1

   <Content>

   This will appear in the blog post together with the slide 1

   </Content>

   ---

   # Slide 2

   <Zoom value={1.2}/>

   <Content>

   This will appear in the blog post together with the slide 2

   The Zoom value determines how "zoomed in" this slide will be on the blog post page. The default value is 1.

   </Content>
   ```

4. **Create another deck** (yes, you need to create at least two decks!) in `decks/another-deck.mdx`

5. Start your site

   ```sh
   gatsby develop
   ```
