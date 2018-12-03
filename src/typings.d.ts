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

interface FluidImage{
  childImageSharp: {
    fluid: object
  }
}

declare module 'react-dynamic-swiper'{
  export const Swiper: any

  export const Slide: any
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
