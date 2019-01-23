import * as React from 'react'
import {graphql} from 'gatsby'
import {Helmet} from 'react-helmet'
import {OutboundLink} from 'gatsby-plugin-google-gtag'
import Waypoint from 'react-waypoint'

import {formatAsDate, PageTitle} from '../utils'

import {ContentContainer, Container} from '../components/container'
import {colors} from '../styles/variables'
import {ArticleEntry, TagList, DateHeading} from '../components/article-list'
import {ShareButtons} from '../components/share'

import IndexLayout from '../layouts/index'

const PostTemplate: React.SFC<{
  data: {
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        title: string
        date: string
        tags: string[]
        lead: string
        syndication: {
          medium: string
          dev: string
        }
      }
    }

    site: {
      siteMetadata: {
        title: string
        siteUrl: string
      }
    }

    nextPost: PostDetails
    previousPost: PostDetails
  }
  location: LocationProps
}> = ({data, location}) => {
  let post = data.markdownRemark

  let read = false

  const handleWaypoint = () => {
    if(!read){
      let w = window as any
      if(w.gtag){
        w.gtag('event', 'finish', {
          event_category: 'Finish Article',
          event_label: post.frontmatter.title
        })
      }
    }

    read = true
  }

  return <IndexLayout color={colors.post}>
    <PageTitle chunks={[post.frontmatter.title]} />
    <Helmet
      meta={[
        {property: 'og:title', content: post.frontmatter.title},
        {property: 'og:description', content: post.frontmatter.lead},
        {property: 'og:site_name', content: data.site.siteMetadata.title},
        {property: 'og:image', content: `${data.site.siteMetadata.siteUrl}/static/social/twitter-${post.id}.png`},
        {property: 'og:image', content: `${data.site.siteMetadata.siteUrl}/static/social/facebook-${post.id}.png`}
      ]}
    />
    <ContentContainer color={colors.post}>
      <h2>{post.frontmatter.title}</h2>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <TagList tags={post.frontmatter.tags} />
      <div dangerouslySetInnerHTML={{__html: post.html}} />
      <Waypoint onEnter={handleWaypoint} />
      <ShareButtons url={location.href} title={post.frontmatter.title} />
      {syndication(post.frontmatter.syndication)}
    </ContentContainer>
    <Container>
      <h2>Other Posts</h2>
      <ArticleEntry article={data.previousPost} />
      <ArticleEntry article={data.nextPost} />
    </Container>
  </IndexLayout>
}

export default PostTemplate

const syndication = (syndication: {
  medium: string
  dev: string
}) => {
  if(!syndication || Object.keys(syndication).length === 0){
    return ''
  }

  console.dir(syndication)

  return <div style={{clear: 'both'}}>
    <h3>Syndication</h3>
    {syndication.medium ? <OutboundLink href={syndication.medium}>Medium</OutboundLink> : '' }
    {syndication.dev ? <OutboundLink href={syndication.dev}>Dev.to</OutboundLink> : ''}
  </div>
}

export const query = graphql`
  query PostTemplateQuery($slug: String!, $next: String!, $previous: String!){
    site{
      siteMetadata{
        title
        siteUrl
      }
    }

    markdownRemark(fields: { slug: {eq: $slug}}){
      id
      html
      frontmatter{
        title
        date
        tags
        lead
        syndication{
          medium
          dev
        }
      }
    }

    nextPost: markdownRemark(fields: { slug: {eq: $next}}){
      frontmatter{
        title
        date
        lead
        tags
      }
      fields{
        slug
        date
        layout
      }
    }

    previousPost: markdownRemark(fields: { slug: {eq: $previous}}){
      frontmatter{
        title
        date
        lead
        tags
      }
      fields{
        slug
        date
        layout
      }
    }
  }
`
