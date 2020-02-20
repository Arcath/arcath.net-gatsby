import * as React from 'react'
import {graphql} from 'gatsby'

import {ArticleGrid, WideGrid, BoxGrid} from '../components/grid'
import {ArticleEntry} from '../components/article-list'

import {MainLayout} from '../layouts/main'
import {PageTitle} from '../utils'
import {Content} from '../components/content'

const PageTemplate: React.SFC<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
      }
    }

    nextPost: PostDetails
    previousPost: PostDetails
  }
}> = ({data}) => {
  let page = data.markdownRemark

  return <MainLayout>
    <PageTitle chunks={[page.frontmatter.title]} />
    <ArticleGrid>
      <h2>{page.frontmatter.title}</h2>
      <Content html={page.html} />
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
    markdownRemark(fields: { slug: {eq: $slug}}){
      html
      frontmatter{
        title
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
