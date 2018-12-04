import * as React from 'react'
import {graphql} from 'gatsby'

import {formatAsDate, PageTitle} from '../utils'

import {ContentContainer, Container} from '../components/container'
import {colors} from '../styles/variables'
import {ArticleEntry, TagList, DateHeading} from '../components/article-list'
import {ShareButtons} from '../components/share'

import IndexLayout from '../layouts/index'

const PostTemplate: React.SFC<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        date: string
        tags: string[]
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
    <ContentContainer color={colors.post}>
      <h2>{post.frontmatter.title}</h2>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <TagList tags={post.frontmatter.tags} />
      <div dangerouslySetInnerHTML={{__html: post.html}} />
      <ShareButtons url={location.href} title={post.frontmatter.title} />
    </ContentContainer>
    <Container>
      <h2>Other Posts</h2>
      <ArticleEntry article={data.previousPost} />
      <ArticleEntry article={data.nextPost} />
    </Container>
  </IndexLayout>
}

export default PostTemplate

export const query = graphql`
  query PostTemplateQuery($slug: String!, $next: String!, $previous: String!){
    markdownRemark(fields: { slug: {eq: $slug}}){
      html
      frontmatter{
        title
        date
        tags
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
