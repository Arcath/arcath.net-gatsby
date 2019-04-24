import * as React from 'react'
import {graphql} from 'gatsby'
import styled from '@emotion/styled'
import {OutboundLink} from 'gatsby-plugin-google-gtag'
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {Container, ContentContainer} from '../components/container'
import {ArticleEntry} from '../components/article-list'
import {colors} from '../styles/variables'
import {PageTitle} from '../utils'
import {Content} from '../components/content'

import {MainLayout} from '../layouts/main'

const Button = styled(OutboundLink)`
  display:block;
  padding:3px;
  background-color:${colors.project};
  color:#fff !important;
  width:auto;
`

const ProjectTemplate: React.SFC<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        year: string
        link: string
      }
    }

    nextPost: PostDetails
    previousPost: PostDetails
  }
}> = ({data}) => {
  let page = data.markdownRemark

  return <MainLayout>
    <PageTitle chunks={[page.frontmatter.title, 'Projects']} />
    <ContentContainer color={colors.project}>
      <h2>{page.frontmatter.title} ({page.frontmatter.year})</h2>
      <Content html={page.html} />
      <Button href={page.frontmatter.link}>{page.frontmatter.title} <FontAwesomeIcon icon={faExternalLinkAlt} /></Button>
    </ContentContainer>
    <Container>
      <h2>My Articles</h2>
      <ArticleEntry article={data.previousPost} />
      <ArticleEntry article={data.nextPost} />
    </Container>
  </MainLayout>
}

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplateQuery($slug: String!, $next: String!, $previous: String!){
    markdownRemark(fields: { slug: {eq: $slug}}){
      html
      frontmatter{
        title
        year
        link
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
