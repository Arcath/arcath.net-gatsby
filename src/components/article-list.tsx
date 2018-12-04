import * as React from 'react'
import {format} from 'date-fns'
import Masonry from 'react-masonry-component'
import styled from '@emotion/styled'
import {Link} from 'gatsby'
import {clearFix} from 'polished'

import {colors, breakpoints} from '../styles/variables'
import {getEmSize} from '../styles/mixins'

export const Tag = styled(Link)`
  float:left;
  color:${colors.white} !important;
  margin:3px;
  padding:3px;
`

const Article = styled('div')`
  float:left;
  border-top:5px solid ${(props: {layout: string}) => {
    switch(props.layout){
      case 'note':
        return colors.note
      case 'book':
        return colors.book
      default:
      return colors.post
    }
  }};
  width:48%;
  margin:1%;
  box-shadow:0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding:10px;
  box-sizing:border-box;

  h3{
    margin-top:0;
  }

  h4{
    color:${colors.gray};
    font-weight:200;
  }

  a{
    color:${(props: {layout: string}) => {
      switch(props.layout){
        case 'note':
          return colors.note
        case 'book':
          return colors.book
        default:
        return colors.post
      }
    }};
  }

  ${Tag}{
    background-color:${(props: {layout: string}) => {
      switch(props.layout){
        case 'note':
          return colors.note
        case 'book':
          return colors.book
        default:
        return colors.post
      }
    }};
  }

  @media(max-width: ${getEmSize(breakpoints.sm)}){
    width: calc(100vw - 0.4em - 10px) !important;
    margin:0.2em;
  }
`

const Tags = styled('ul')`
  list-style:none;
  padding:0;
  margin:0;
  ${clearFix()}
`

export const DateHeading = styled('h4')`
  color:${colors.gray};
  font-weight:200;
`

export const ArticleHeading = styled('h2')`
  small{
    color:${colors.gray};
    font-size:0.6em;
    font-weight:200;
  }
`

export const ArticleList = ({articles}: {articles: {
  edges: {
    node: PostDetails
  }[]
}}) => {
  return <Masonry>
  {articles.edges.map((edge, i) => {
    let article = edge.node

    return <ArticleEntry article={article} key={i} />
  })}
</Masonry>
}

export const ArticleEntry = ({article}: {article: PostDetails}) => {
  if(!article){
    return <div></div>
  }

  return <Article layout={article.fields.layout}>
    <h3><Link to={article.fields.slug}>{article.frontmatter.title}</Link></h3>
    <h4>{format(article.fields.date, 'Do MMMM YYYY')}</h4>
    <p>{article.frontmatter.lead}</p>
    <TagList tags={article.frontmatter.tags} />
  </Article>
}

export const TagList = ({tags}: {tags: PostDetails["frontmatter"]["tags"]}) => {
  return <Tags>
    {(tags || []).map((tag, j) => {
      return <li key={j}><Tag to={'/articles/' + tag.toLowerCase()}>{tag}</Tag></li>
    })}
  </Tags>
}
