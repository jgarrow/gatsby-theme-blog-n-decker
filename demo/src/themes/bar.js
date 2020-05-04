import { hack, comic } from "@mdx-deck/themes"

// export const theme = {
//   ...hack,
// }

export const theme = {
  initialColorMode: "light",
  ...hack,
  colors: {
    ...hack.colors,
    modes: {
      dark: {
        ...comic.colors,
      },
    },
  },
}
