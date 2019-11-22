import * as React from 'react'
import Masonry from 'react-masonry-component'
import styled from '@emotion/styled'
import {Link} from 'gatsby'
import {clearFix} from 'polished'

import {colors, breakpoints, Colors, Dimensions} from '../styles/variables'
import {getEmSize} from '../styles/mixins'
import {formatAsDate} from '../utils'

export const Tag = styled(Link)`
  float:left;
  color:${Colors.primary.white} !important;
  margin:3px;
  padding:3px;
  background-color: ${Colors.brand.light}
`

export const Article = styled('div')`
  float:left;
  background-color:${Colors.primary.white};
  border-radius:${Dimensions.sizes.padding / 2}px;
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

export const DateHeading = styled('h3')`
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

  return <Article>
    <h3><Link to={article.fields.slug}>{article.frontmatter.title}</Link></h3>
    <h4>{formatAsDate(article.fields.date)}</h4>
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
