import * as React from 'react'
import {graphql} from 'gatsby'
import {faBook} from '@fortawesome/free-solid-svg-icons'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

import {formatAsDate, PageTitle} from '../utils'


import {ContentContainer, Container} from '../components/container'
import {colors} from'../styles/variables'
import {ShareButtons} from '../components/share'
import {ArticleEntry, DateHeading, ArticleHeading} from '../components/article-list'

import IndexLayout from '../layouts/index'

const BookTemplate: React.SFC<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        link: string
        date: string
        author: string
      }
    }
    nextPost: PostDetails
    previousPost: PostDetails
  }

  location: LocationProps
}> = ({data, location}) => {
  let post = data.markdownRemark

  return <IndexLayout color={colors.book} icon={faBook}>
    <ContentContainer color={colors.book}>
      <PageTitle chunks={[post.frontmatter.title, 'Books']} />
      <ArticleHeading>{post.frontmatter.title} <small>by {post.frontmatter.author}</small></ArticleHeading>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
      <p>
        <OutboundLink href={post.frontmatter.link}>Buy on Amazon</OutboundLink><br />
        <small>Following this link and making a purchase supports this site.</small>
      </p>
      <ShareButtons url={location.href} title={post.frontmatter.title} />
    </ContentContainer>
    <Container>
      <h2>Other Posts</h2>
      <ArticleEntry article={data.previousPost} />
      <ArticleEntry article={data.nextPost} />
    </Container>
  </IndexLayout>
}

export default BookTemplate

export const query = graphql`
  query BookTemplateQuery($slug: String!, $next: String!, $previous: String!){
    markdownRemark(fields: { slug: {eq: $slug}}){
      html
      frontmatter{
        title
        link
        date
        author
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
