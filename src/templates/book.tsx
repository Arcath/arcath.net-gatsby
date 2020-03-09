import * as React from 'react'
import {graphql} from 'gatsby'
import {OutboundLink} from 'gatsby-plugin-google-gtag'

import {formatAsDate, PageTitle} from '../utils'

import {ArticleGrid, WideGrid, BoxGrid} from '../components/grid'
import {ShareButtons} from '../components/share'
import {ArticleEntry, DateHeading, ArticleHeading} from '../components/article-list'
import {OpenGraphTags} from '../components/open-graph'
import {Content} from '../components/content'


import {MainLayout} from '../layouts/main'

const BookTemplate: React.SFC<{
  data: {
    mdx: {
      id: string
      body: string
      frontmatter: {
        title: string
        link: string
        date: string
        author: string
      }
    }
    nextPost: PostDetails
    previousPost: PostDetails

    site: {
      siteMetadata: {
        title: string
        siteUrl: string
      }
    }
  }

  location: LocationProps
}> = ({data, location}) => {
  let post = data.mdx

  return <MainLayout>
    <OpenGraphTags title={post.frontmatter.title} lead="" />
    <ArticleGrid>
      <PageTitle chunks={[post.frontmatter.title, 'Books']} />
      <ArticleHeading>{post.frontmatter.title} <small>by {post.frontmatter.author}</small></ArticleHeading>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <Content mdx={post.body} />
      <p>
        <OutboundLink href={post.frontmatter.link}>Buy on Amazon</OutboundLink><br />
        <small>Following this link and making a purchase supports this site.</small>
      </p>
      <ShareButtons url={location.href} title={post.frontmatter.title} />
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

export default BookTemplate

export const query = graphql`
  query BookTemplateQuery($slug: String!, $next: String!, $previous: String!){
    site{
      siteMetadata{
        title
        siteUrl
      }
    }

    mdx(fields: { slug: {eq: $slug}}){
      body
      frontmatter{
        title
        link
        date
        author
      }
    }

    nextPost: mdx(fields: { slug: {eq: $next}}){
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

    previousPost: mdx(fields: { slug: {eq: $previous}}){
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
