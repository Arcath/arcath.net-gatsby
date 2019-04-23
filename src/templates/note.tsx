import * as React from 'react'
import {graphql} from 'gatsby'

import {formatAsDate, PageTitle} from '../utils'

import {ContentContainer, Container} from '../components/container'
import {ArticleEntry, TagList, DateHeading} from '../components/article-list'
import {ShareButtons} from '../components/share'
import {OpenGraphTags} from '../components/open-graph'

import {MainLayout} from '../layouts/main'

const NoteTemplate: React.SFC<{
  data: {
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        title: string
        date: string
        tags: string[]
        lead: string
      }
    }

    nextPost: PostDetails
    previousPost: PostDetails
  }
  location: LocationProps
}> = ({data, location}) => {
  let post = data.markdownRemark

  return <MainLayout>
    <PageTitle chunks={[post.frontmatter.title]} />
    <OpenGraphTags title={post.frontmatter.title} lead={post.frontmatter.lead} id={post.id} />
    <ContentContainer>
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
  </MainLayout>
}

export default NoteTemplate

export const query = graphql`
  query NoteTemplateQuery($slug: String!, $next: String!, $previous: String!){
    markdownRemark(fields: { slug: {eq: $slug}}){
      id
      html
      frontmatter{
        title
        date
        tags
        lead
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
