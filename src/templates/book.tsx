import * as React from 'react'
import {graphql} from 'gatsby'
import {faBook} from '@fortawesome/free-solid-svg-icons'

import {ContentContainer} from '../components/container'
import {colors} from'../styles/variables'

import IndexLayout from '../layouts/index'

const BookTemplate: React.SFC<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        link: string
      }
    }
  }
}> = ({data}) => {
  let post = data.markdownRemark

  return <IndexLayout color={colors.book} icon={faBook}>
    <ContentContainer>
      <h2>{post.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
      <p>
        <a href={post.frontmatter.link}>Buy on Amazon</a><br />
        <small>Following this link and making a purchase supports this site.</small>
      </p>
    </ContentContainer>
  </IndexLayout>
}

export default BookTemplate

export const query = graphql`
  query BookTemplateQuery($slug: String!){
    markdownRemark(fields: { slug: {eq: $slug}}){
      html
      frontmatter{
        title
        link
      }
    }
  }
`
