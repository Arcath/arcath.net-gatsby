import React, {ReactHTMLElement} from 'react'
import {OutboundLink} from 'gatsby-plugin-google-gtag'
import {Link} from 'gatsby'
import {MDXProvider} from "@mdx-js/react"
import {MDXRenderer} from 'gatsby-plugin-mdx'

const Anchor = (props: ReactHTMLElement<HTMLAnchorElement>["props"]) => {
  const {href} = props

  if(href!.substr(0, 4) === 'http'){
    return <OutboundLink href={href!}>{props.children}</OutboundLink>
  }

  return <Link to={href!}>{props.children}</Link>
}

const Paragraph = (node: Partial<ReactHTMLElement<HTMLParagraphElement>["props"]>) => {
  let className = ''

  if(
    node.children
    &&
    (
      ((node.children as any)[0] && (node.children as any)[0].props && (node.children as any)[0].props.className === 'gatsby-resp-image-wrapper')
      ||
      ((node.children as any).props && (node.children as any).props.className === 'gatsby-resp-image-wrapper')
    )
  ){
    className = "full-width"
  }

  return <p {...node} className={className} />
}

export const Content: React.FC<{mdx: string}> = ({mdx}) => {
  return <MDXProvider
    components={{
      a: Anchor,
      p: Paragraph
    }}
  >
    <MDXRenderer>{mdx}</MDXRenderer>
  </MDXProvider>
}
