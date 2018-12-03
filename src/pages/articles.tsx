import * as React from 'react'
import {StaticQuery, graphql} from 'gatsby'

import IndexLayout from '../layouts/index'

import {Container} from '../components/container'
import {ArticleList} from '../components/article-list'

const ArticlesPage = () => {
  return <IndexLayout>
    <Container>
      <h2>Articles</h2>
      <StaticQuery
        query={graphql`
          query ArticlesQuery{
            articles: allMarkdownRemark(
              filter: {fields: {layout: {glob: "+(post|book|note)"}}},
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
        `}
        render={(data: {
          articles: {
            edges: {
              node: {
                frontmatter: {
                  title: string
                  lead: string
                  tags: string[]
                  date: string
                }
                fields: {
                  slug: string
                  date: string
                  layout: string
                }
              }
            }[]
          }
        }) => {
          return <ArticleList articles={data.articles} />
        }}
      />
    </Container>
  </IndexLayout>
}

export default ArticlesPage
