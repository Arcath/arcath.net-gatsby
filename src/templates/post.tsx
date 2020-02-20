import * as React from 'react'
import {graphql} from 'gatsby'
import {OutboundLink} from 'gatsby-plugin-google-gtag'
import {Waypoint} from 'react-waypoint'

import {formatAsDate, PageTitle} from '../utils'

import {ArticleGrid, WideGrid, BoxGrid} from '../components/grid'
import {ArticleEntry, TagList, DateHeading} from '../components/article-list'
import {ShareButtons} from '../components/share'
import {OpenGraphTags} from '../components/open-graph'
import {Content} from '../components/content'

import {MainLayout} from '../layouts/main'

const PostTemplate: React.SFC<{
  data: {
    markdownRemark: {
      id: string
      html: string
      fields: {
        slug: string
      }
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

  return <MainLayout>
    <PageTitle chunks={[post.frontmatter.title]} />
    <OpenGraphTags title={post.frontmatter.title} lead={post.frontmatter.lead} slug={post.fields.slug} />
    <ArticleGrid role="main">
      <h2>{post.frontmatter.title}</h2>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <TagList tags={post.frontmatter.tags} />
      <Content html={post.html}/>
      <Waypoint onEnter={handleWaypoint} />
      <ShareButtons url={location.href} title={post.frontmatter.title} />
      {syndication(post.frontmatter.syndication)}
    </ArticleGrid>
    <WideGrid>
      <h2>Other Posts</h2>
      <BoxGrid targetWidth={100}>
        <ArticleEntry article={data.previousPost} />
        <ArticleEntry article={data.nextPost} />
      </BoxGrid>
    </WideGrid>
  </MainLayout>
}

export default PostTemplate

const syndication = (syndication: {
  medium: string
  dev: string
}) => {
  if(!syndication || Object.keys(syndication).length === 0){
    return ''
  }

  return <>
    <h3>Syndication</h3>
    <p>
      {syndication.medium ? <OutboundLink href={syndication.medium}>Medium</OutboundLink> : '' }
      {syndication.dev ? <OutboundLink href={syndication.dev}>Dev.to</OutboundLink> : ''}
    </p>
  </>
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
      fields{
        slug
      }
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
