import * as React from 'react'
import {Helmet} from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

interface OpenGraphProps{
  title: string
  lead: string
  id: string
}

interface StaticQueryData{
  site: {
    siteMetadata: {
      title: string
      siteUrl: string
      author: {
        social: {
          twitterHandle: string
        }
      }
    }
  }
}

export const OpenGraphTags: React.SFC<OpenGraphProps> = ({title, lead, id}) => (
  <StaticQuery
    query={graphql`
      query OpenGraphQuery{
        site{
          siteMetadata{
            title
            siteUrl
            author{
              social{
                twitterHandle
              }
            }
          }
        }
      }
    `}
    render={(data: StaticQueryData) => (
      <Helmet meta={[
        {property: 'og:title', content: title},
        {property: 'og:description', content: lead},
        {property: 'og:site_name', content: data.site.siteMetadata.title},
        {property: 'og:image', content: `${data.site.siteMetadata.siteUrl}/social/twitter-${id}.png`},
        {property: 'og:image', content: `${data.site.siteMetadata.siteUrl}/social/facebook-${id}.png`},
        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:site', content: data.site.siteMetadata.author.social.twitterHandle}
      ]} />
    )}
  />
)
