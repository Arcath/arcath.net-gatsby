import * as React from 'react'
import {faHome} from '@fortawesome/free-solid-svg-icons'
import {StaticQuery, graphql} from 'gatsby'

import IndexLayout from '../layouts/index'

import {Container} from '../components/container'
import {ArticleList} from '../components/article-list'


const IndexPage = () => {
  return <IndexLayout expanded icon={faHome}>
    <Container>
      <h2>Hi</h2>
      <p>I am an IT Engineer &amp; Web Developer from the North West of England.</p>
      <p>On this site you'll find articles about things I've done at work, news and updates on some of my projects and some more general content.</p>
      <h3>Recent Posts</h3>
      <StaticQuery
        query={graphql`
          query IndexArticlesQuery{
            articles: allMarkdownRemark(
              filter: {fields: {layout: {glob: "+(post|book|note)"}}},
              sort: {fields: [fields___date], order: DESC},
              limit: 10
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

export default IndexPage
