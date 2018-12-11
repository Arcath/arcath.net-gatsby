interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}

/** type shim for pngs */

declare module '*.png' {
  const pngImage: any
  export = pngImage
}

interface FluidImage{
  childImageSharp: {
    fluid: object
  }
}

declare module 'react-dynamic-swiper'{
  export const Swiper: any

  export const Slide: any
}

declare module 'gatsby-plugin-google-gtag'{
  export const OutboundLink: React.ComponentClass<{
    href: string
  }>
}

interface PostDetails{
  frontmatter: {
    title: string
    date: string
    lead: string
    tags: string[]
  }
  fields: {
    slug: string
    date: string
    layout: string
  }
}

interface LocationProps{
  hash: string
  hostname: string
  href: string
  key: string
  origin: string
  pathname: string
  port: string
  protocol: string
}
