import * as React from 'react'
import styled from '@emotion/styled'
import {graphql, Link} from 'gatsby'
import {Helmet} from 'react-helmet'
import {Global} from '@emotion/core'

import {PageTitle, formatAsDate} from '../utils'

import {Colors, Dimensions} from '../styles/variables'

import {WideGrid} from '../components/grid'
import {Footer} from '../components/footer'

import badge from '../../static/512.png'
import {globalCSS} from '../styles/normalize'

const Index = styled('div')`

`

const Box = styled('div')`
  background:linear-gradient(${Dimensions.lightsource}, ${Colors.brand.light}, ${Colors.brand.dark});
  width:150vw;
  height:100vh;
  position:absolute;
  top:-50vh;
  left:-25vw;
  transform:rotate(${Dimensions.lightsource});
  z-index:5;

  @media(max-width: 1140px){
    left:-30vw;
  }

  @media(max-width:900px){
    left:-35vw;
  }

  @media(max-width: 735px){
    left:-40vw;
  }

  @media(max-width: 620px){
    left:-45vw;
  }

  @media(max-width:550px){
    left:-50vw;
  }

  @media(max-width: 480px){
    left:-55vw;
  }

  @media(max-width:430px){
    left:-60vw;
  }
`

const Hero = styled('div')`
  width:40vw;
  margin:auto;
  margin-top:25vh;
  color:${Colors.primary.white};
  text-align:center;
  z-index:9;

  @media(max-width:900px){
    margin-top:20vh;
    width:50vw;
  }

`
const IndexContent = styled<'div', {color: string}>('div')`
  background-color:${(props) => props.color};
  border-radius:${Dimensions.sizes.padding / 2}px;
  margin-top:25vh;
  margin-bottom:${Dimensions.sizes.margin}px;
  padding:${Dimensions.sizes.padding * 2}px;
  box-sizing:border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  z-index:9;

  h2{
    margin-top:0;
  }
`

const IndexPost = styled('div')`
  h3{
    border-bottom:${Colors.brand.dark} ${Dimensions.sizes.margin / 2}px solid;

    small{
      margin-left:${Dimensions.sizes.margin}px;
      font-weight:${Dimensions.fontWeights.light};
    }
  }
`

const IndexContentBoxes = styled('div')`
  ${IndexContent}{
    margin-top:${Dimensions.sizes.margin}px;
    width:calc(50% - ${Dimensions.sizes.margin}px);
    float:left;
    margin-right:${Dimensions.sizes.margin * 2}px;

    &:nth-child(even){
      margin-right:0;
    }
  }
`



const IndexPage: React.SFC<{data: IndexPageData}> = ({data}) => (
  <Index>
    <Global styles={globalCSS} />
    <Helmet
      meta={[
        {name: 'theme-color', content: Colors.brand.dark},
        {name: 'google-site-verification', content: 'qi2oRAc2fmvBL1qOVY4CgICdWCmZZJhKtkzgd1knYG4'},
        {name: 'description', content: data.site.siteMetadata.description}
      ]}
      link={[
        {rel: 'icon', type: 'image/png', href: badge}
      ]}
      htmlAttributes={{
        lang: 'en'
      }}
    />
    <PageTitle chunks={[data.site.siteMetadata.description]} />
    <Box />
    <WideGrid>
      <Hero>
        <h1>{data.site.siteMetadata.title}</h1>
        <h5>{data.site.siteMetadata.description}</h5>
      </Hero>
      <IndexContent color={Colors.primary.white}>
        <h2>Blog</h2>
        {data.articles.edges.map((edge) => {
          let post = edge.node

          return <IndexPost>
            <h3>
              <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              <small>{formatAsDate(post.frontmatter.date)}</small>
            </h3>
            <p>{post.frontmatter.lead}</p>
          </IndexPost>
        })}
        <Link to="/articles">View all Articles</Link>
      </IndexContent>
      <IndexContentBoxes color={Colors.primary.white}>
        <IndexContent color={Colors.primary.white}>
          <h2>Projects</h2>
          {data.projects.edges.map((edge) => {
            let project = edge.node

            return <IndexPost>
              <h3>
                <Link to={project.fields.slug}>{project.frontmatter.title}</Link>
                <small>{project.frontmatter.year}</small>
              </h3>
              <p>{project.frontmatter.lead}</p>
            </IndexPost>
          })}
          <Link to="/projects">All Projects</Link>
        </IndexContent>
        <IndexContent color={Colors.primary.white}>
          <h2>Books</h2>
          {data.books.edges.map((edge) => {
            let book = edge.node

            return <IndexPost>
              <h3>
                <Link to={book.fields.slug}>{book.frontmatter.title}</Link>
                <small>by {book.frontmatter.author}</small>
              </h3>
              <p>{book.frontmatter.lead}</p>
            </IndexPost>
          })}
          <Link to="/books">All Books</Link>
        </IndexContent>
      </IndexContentBoxes>
      <Footer />
    </WideGrid>
  </Index>
)

interface IndexPageData{
  site: SiteMetadata<
    "title" | "description" | "siteUrl" | "author",
    "social",
    "twitter" | "github" | "dev" | "medium"
  >

  articles: Edges<Post>
  books: Edges<Book>
  projects: Edges<Project>

  me: {
    childImageSharp: {
      fixed: {
        src: string
      }
    }
  }
}

export const pageQuery = graphql`
  query IndexPageQuery{
    site{
      siteMetadata {
        title
        description
        siteUrl
        author{
          social{
            twitter
            github
            dev
            medium
          }
        }
      }
    }

    projects: allMdx(
      filter: {fields: {layout: {glob: "+(project)"}}},
      sort: {fields: [frontmatter___year], order: DESC},
      limit: 2
    ){
      edges{
        node{
          frontmatter{
            title
            year
            lead
          }
          fields{
            slug
          }
        }
      }
    }

    articles: allMdx(
      filter: {fields: {layout: {glob: "+(post|note)"}}},
      sort: {fields: [fields___date], order: DESC},
      limit: 3
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

    books: allMdx(
      filter: {fields: {layout: {glob: "+(book)"}}},
      sort: {fields: [fields___date], order: DESC},
      limit: 2
    ){
      edges{
        node{
          frontmatter{
            title
            lead
            author
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

    me: file(relativePath: {eq: "img/me.jpg"}){
      childImageSharp{
        fixed(width: 150, height: 150, quality: 100){
          src
        }
      }
    }
  }
`

export default IndexPage
