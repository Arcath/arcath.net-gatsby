import * as React from 'react'
import styled from '@emotion/styled'

import {Colors, Dimensions} from '../styles/variables'
import {MainLayout} from '../layouts/main'
import {keys, PageTitle, Clear} from '../utils'
import {ArticleEntry, TagList} from '../components/article-list'

const ColorSwatches = styled('div')`
  overflow:auto;
`

const ColorSwatch = styled<'div', {color: string}>('div')`
  border: ${Dimensions.sizes.padding}px solid ${Colors.primary.black};
  border-radius:${Dimensions.sizes.padding / 2}px;
  background-color:${(props) => props.color};
  width:${Dimensions.sizes.small}px;
  height:${Dimensions.sizes.small}px;
  float:left;
  margin:${Dimensions.sizes.margin}px;
  box-sizing:border-box;
`

const ExampleBlock = styled('div')`
  background-color:${Colors.primary.black};
  color:${Colors.primary.white};
  box-sizing:border-box;
  padding:${Dimensions.sizes.padding}px;
  border-radius:${Dimensions.sizes.padding / 2}px;

  h1, h2, h3, h4, h5, h6{
    color: ${Colors.primary.white};
  }
`

const ElementsPage = () => {
  return <MainLayout container>
    <PageTitle chunks={['Elements']} />
    <h2>Colours</h2>
    <h3>Primary Colours</h3>
    <ColorSwatches>
      {keys(Colors.primary).map((key) => (<ColorSwatch color={Colors.primary[key]} key={key} />))}
    </ColorSwatches>
    <h3>Brand Colours</h3>
    <ColorSwatches>
      {keys(Colors.brand).map((key) => (<ColorSwatch color={Colors.brand[key]} key={key} />))}
    </ColorSwatches>
    <h3>Accent Colours</h3>
    <ColorSwatches>
      {keys(Colors.accents).map((key) => (<ColorSwatch color={Colors.accents[key]} key={key} />))}
    </ColorSwatches>
    <h2>Typography</h2>
    <h3>Headings</h3>
    <ExampleBlock>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </ExampleBlock>
    <h2>Components</h2>
    <h3>Articles</h3>
    <ArticleEntry article={{
      frontmatter: {
        title: 'Example Article',
        date: '1970-01-01T00:00:00Z',
        lead: 'This is an example of how the site renders Articles.',
        tags: ['Gatsby']
      },
      fields: {
        slug: '/',
        date: '1970-01-01T00:00:00Z',
        layout: 'post'
      }
    }} />
    <Clear />
    <h3>Tags</h3>
    <TagList tags={[
      'Gatsby'
    ]} />
  </MainLayout>
}

export default ElementsPage
