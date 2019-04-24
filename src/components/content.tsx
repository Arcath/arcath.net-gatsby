import * as React from 'react'
import convert, { HTMROptions } from 'htmr'
import {OutboundLink} from 'gatsby-plugin-google-gtag'
import {Link} from 'gatsby'

export const Content: React.FunctionComponent<{html: string}> = ({html}) => {
  const transform: HTMROptions["transform"] = {
    a: (node) => {
      let href = node.href

      if(href.substr(0, 4) === 'http'){
        return <OutboundLink href={href}>{node.children}</OutboundLink>
      }

      return <Link to={href}>{node.children}</Link>
    }
  }

  return convert(html, { transform })
}
