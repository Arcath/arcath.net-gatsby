import * as React from 'react'
import {graphql} from 'gatsby'

import {formatAsDate, PageTitle} from '../utils'

import {ArticleGrid, WideGrid, BoxGrid} from '../components/grid'
import {ArticleEntry, TagList, DateHeading} from '../components/article-list'
import {ShareButtons} from '../components/share'
import {OpenGraphTags} from '../components/open-graph'
import {Content} from '../components/content'

import {MainLayout} from '../layouts/main'

const NoteTemplate: React.SFC<{
  data: {
    mdx: {
      id: string
      body: string
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
  let post = data.mdx

  return <MainLayout>
    <PageTitle chunks={[post.frontmatter.title]} />
    <OpenGraphTags title={post.frontmatter.title} lead={post.frontmatter.lead} />
    <ArticleGrid>
      <h2>{post.frontmatter.title}</h2>
      <DateHeading>{formatAsDate(post.frontmatter.date)}</DateHeading>
      <TagList tags={post.frontmatter.tags} />
      <Content mdx={post.body} />
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

export default NoteTemplate

export const query = graphql`
  query NoteTemplateQuery($slug: String!, $next: String!, $previous: String!){
    mdx(fields: { slug: {eq: $slug}}){
      id
      body
      frontmatter{
        title
        date
        tags
        lead
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
