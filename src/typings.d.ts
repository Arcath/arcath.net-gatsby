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

declare module 'htmr'{
  type HTMRFunction = (node: any, props: {}, children: React.ReactElement) => React.ReactElement

  export interface HTMROptions{
    transform: {[node: string]: React.ReactElement | HTMRFunction | string}
  }

  const convert: (html: string, options: HTMROptions) => React.ReactElement

  export default convert
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

interface Frontmatter{
  title: string
  lead: string
  tags: string[]
  date: Date
  year: string
  author: string
}

interface Fields{
  slug: string
  layout: string
}

interface MarkdownNode<T extends keyof Frontmatter = keyof Frontmatter, K extends keyof Fields = keyof Fields>{
  frontmatter: Pick<Frontmatter, T>
  fields: Pick<Fields, K>
}

type Post<T = "title" | "date" | "lead" | "tags", K = "slug" | "layout"> = MarkdownNode<T, K>
type Project<T = "title" | "lead" | "year", K = "slug"> = MarkdownNode<T, K>
type Book<T = "title"| "date" | "lead" | "author", K = "slug"> = MarkdownNode<T, K>

interface Edges<T>{
  edges: Node<T>[]
}

interface Node<T>{
  node: T
}

interface Metadata<
  T extends keyof Author = keyof Author,
  K extends keyof Social = keyof Social
>{
  title: string
  description: string
  siteUrl: string
  author: Pick<Author<K>, T>
}

interface Author<T>{
  name: string
  about: string
  email: 'adam@arcath.net',
  social: Pick<Social, T>
}

interface Social{
  twitter: string
  twitterHandle: string
  github: string
  instagram: string
  youtube: string
  dev: string
  medium: string
}

type SiteMetadata<
  T extends keyof Metadata = keyof Metadata,
  K extends keyof Author = keyof Author,
  P extends keyof Social = keyof Social
> = {
  siteMetadata: Pick<Metadata<K, P>, T>
}
