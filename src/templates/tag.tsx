import * as React from 'react'
import {graphql} from 'gatsby'

import {WideGrid} from '../components/grid'
import {ArticleList} from '../components/article-list'
import {PageTitle} from '../utils'

import {MainLayout} from '../layouts/main'

const TagTemplate: React.SFC<{
  data: {
    articles:{
      edges: {
        node: {
          frontmatter: {
            title: string
            lead: string
            tags: string[]
            date: string
          }
          fields: {
            date: string
            slug: string
            layout: string
          }
        }
      }[]
    }
  }
  pageContext: {
    tag: string
  }
}> = ({data, pageContext}) => {

  return <MainLayout>
    <PageTitle chunks={[pageContext.tag, 'Tags']} />
    <WideGrid wideHeading>
      <h2>{pageContext.tag} ({data.articles.edges.length})</h2>
      <ArticleList articles={data.articles} />
    </WideGrid>
  </MainLayout>
}

export default TagTemplate

export const query = graphql`
  query TagTemplateQuery($tag: String!){
    articles: allMarkdownRemark(
      filter: {frontmatter: {tags: {in: [$tag]}}},
      sort: {fields: [fields___date], order: DESC}
    ){
      edges{
        node{
          frontmatter{
            title
            lead
            tags
            date
          }
          fields{
            date
            slug
            layout
          }
        }
      }
    }
  }
`
