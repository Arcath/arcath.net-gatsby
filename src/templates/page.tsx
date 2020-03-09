import * as React from 'react'
import {graphql} from 'gatsby'

import {ArticleGrid, WideGrid, BoxGrid} from '../components/grid'
import {ArticleEntry} from '../components/article-list'

import {MainLayout} from '../layouts/main'
import {PageTitle} from '../utils'
import {Content} from '../components/content'

const PageTemplate: React.SFC<{
  data: {
    mdx: {
      body: string
      frontmatter: {
        title: string
      }
    }

    nextPost: PostDetails
    previousPost: PostDetails
  }
}> = ({data}) => {
  let page = data.mdx

  return <MainLayout>
    <PageTitle chunks={[page.frontmatter.title]} />
    <ArticleGrid>
      <h2>{page.frontmatter.title}</h2>
      <Content mdx={page.body} />
    </ArticleGrid>
    <WideGrid>
      <h2>My Articles</h2>
      <BoxGrid targetWidth={100}>
        <ArticleEntry article={data.previousPost} />
        <ArticleEntry article={data.nextPost} />
      </BoxGrid>
    </WideGrid>
  </MainLayout>
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!, $next: String!, $previous: String!){
    mdx(fields: { slug: {eq: $slug}}){
      body
      frontmatter{
        title
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
