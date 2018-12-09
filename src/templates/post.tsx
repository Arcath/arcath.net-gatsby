import * as React from 'react'
import {graphql} from 'gatsby'
import {Helmet} from 'react-helmet'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

import {formatAsDate, PageTitle} from '../utils'

import {ContentContainer, Container} from '../components/container'
import {colors} from '../styles/variables'
import {ArticleEntry, TagList, DateHeading} from '../components/article-list'
import {ShareButtons} from '../components/share'

import IndexLayout from '../layouts/index'

import badge from '../static/img/badge.png'

const PostTemplate: React.SFC<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        date: string
        tags: string[]
        lead: string
        syndication: {
          medium: string
        }
      }
    }

    site: {
      siteMetadata: {
        title: string
      }
    }

    nextPost: PostDetails
    previousPost: PostDetails
  }
  location: LocationProps
}> = ({data, location}) => {
  let post = data.markdownRemark

  return <IndexLayout color={colors.post}>
    <PageTitle chunks={[post.frontmatter.title]} />
    <Helmet
      meta={[
        {property: 'og:title', content: post.frontmatter.title},
        {property: 'og:description', content: post.frontmatter.lead},
        {property: 'og:site_name', contnet: data.site.siteMetadata.title},
        {property: 'og:image', content: badge}
      ]}
    />
    <ContentContainer color={colors.post}>
      <h2>{post.frontmatter.title}</h2>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <TagList tags={post.frontmatter.tags} />
      <div dangerouslySetInnerHTML={{__html: post.html}} />
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
}) => {
  if(!syndication || Object.keys(syndication).length === 0){
    return ''
  }

  return <div style={{clear: 'both'}}>
    <h3>Syndication</h3>
    <OutboundLink href={syndication.medium}>Medium</OutboundLink>
  </div>
}

export const query = graphql`
  query PostTemplateQuery($slug: String!, $next: String!, $previous: String!){
    site{
      siteMetadata{
        title
      }
    }

    markdownRemark(fields: { slug: {eq: $slug}}){
      html
      frontmatter{
        title
        date
        tags
        lead
        syndication{
          medium
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
