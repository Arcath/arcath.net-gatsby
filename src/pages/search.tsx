import * as React from 'react'
import styled from '@emotion/styled'

import IndexLayout from '../layouts/index'

import {Container} from '../components/container'
import {fonts, colors} from '../styles/variables'
import {ArticleList} from '../components/article-list'

const SearchBox = styled('input')`
  width:100%;
  padding:10px;
  font-family:${fonts.body};
  border:1px ${colors.brand} solid;
`

declare global{
  interface Window{
    __LUNR__: {
      [language: string]: {
        index: {
          search: (query: string) => Array<{ref: string, score: number, matchData: {}}>
        }
        store: {
          [ref: string]: {
            title: string
            lead: string
            url: string
            date: string
            layout: string
            tags: string[]
          }
        }
      }
    }
  }
}

class SearchPage extends React.Component<{}, {
  query: string
}>{
  constructor(props: {}){
    super(props)

    this.state = {
      query: ''
    }
  }

  componentDidMount(){

  }

  searchTitle(){
    if(this.state.query.length === 0){
      return 'Search'
    }else{
      return `Search results for "${this.state.query}"`
    }
  }

  handleSearch(query: string){
    this.setState({
      query
    })
  }

  results(){
    if(this.state.query.length > 0){
      let results = window.__LUNR__['en'].index.search(this.state.query).map((result) => {
        let ref = window.__LUNR__['en'].store[result.ref]

        return {
          node: {
            frontmatter: {
              title: ref.title,
              lead: ref.lead,
              tags: ref.tags,
              date: ref.date
            },
            fields: {
              slug: ref.url,
              date: ref.date,
              layout: ref.layout
            }
          }
        }
      })

      return [<h2>{results.length} Results</h2>, <ArticleList articles={{edges: results}} />]
    }
  }

  render(){
    return <IndexLayout>
      <Container>
        <h1>{this.searchTitle()}</h1>
        <SearchBox onChange={(e) => {
          this.handleSearch(e.target.value)
        }} />
        {this.results()}
      </Container>
    </IndexLayout>
  }
}

export default SearchPage
