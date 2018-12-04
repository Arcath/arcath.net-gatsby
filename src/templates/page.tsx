import * as React from 'react'
import {graphql} from 'gatsby'

import {Container, ContentContainer} from '../components/container'
import {ArticleEntry} from '../components/article-list'

import IndexLayout from '../layouts/index'
import {colors} from '../styles/variables'

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

  return <IndexLayout>
    <ContentContainer color={colors.brand}>
      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{__html: page.html}} />
    </ContentContainer>
    <Container>
      <h2>My Articles</h2>
      <ArticleEntry article={data.previousPost} />
      <ArticleEntry article={data.nextPost} />
    </Container>
  </IndexLayout>
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
