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
    }
  }

  return <div>{convert(html, { transform })}</div>
}
