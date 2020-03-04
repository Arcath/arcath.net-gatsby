import React, {ReactHTMLElement} from 'react'
import convert from 'htmr'
import {HtmrOptions} from 'htmr/lib/types'
import {OutboundLink} from 'gatsby-plugin-google-gtag'
import {Link} from 'gatsby'

export const Content: React.FunctionComponent<{html: string}> = ({html}) => {
  const transform: HtmrOptions["transform"] = {
    a: (node: Partial<ReactHTMLElement<HTMLAnchorElement>["props"]>) => {
      const {href} = node

      if(href!.substr(0, 4) === 'http'){
        return <OutboundLink href={href!}>{node.children}</OutboundLink>
      }

      return <Link to={href!}>{node.children}</Link>
    },
    p: (node: Partial<ReactHTMLElement<HTMLParagraphElement>["props"]>) => {
      let className = ''

      if((node.children! as any).length === 1 && (node.children! as any)[0].type === 'span'){
        console.dir(node.children)
        className = "full-width"
      }

      return <p {...node} className={className} />
    }
  }

  return <>{convert(html, { transform })}</>
}
