import * as React from 'react'
import {Helmet} from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

interface OpenGraphProps{
  title: string
  lead: string
  slug?: string
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

export const OpenGraphTags: React.SFC<OpenGraphProps> = ({title, lead, slug}) => (
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
      <>
        <Helmet meta={[
          {property: 'og:title', content: title},
          {property: 'og:description', content: lead},
          {property: 'og:site_name', content: data.site.siteMetadata.title},
          {property: 'twitter:card', content: 'summary_large_image'},
          {property: 'twitter:site', content: data.site.siteMetadata.author.social.twitterHandle}
        ]} />
        {!slug ? <></> : <Helmet meta={[
          {property: 'og:image', content: `${data.site.siteMetadata.siteUrl}${slug}/social-540-282.png`},
          {property: 'og:image', content: `${data.site.siteMetadata.siteUrl}${slug}/social-600-314.png`}
        ]} />}
      </>
    )}
  />
)
