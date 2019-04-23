import * as React from 'react'
import {StaticQuery, graphql, Link} from 'gatsby'
import Masonry from 'react-masonry-component'

import {MainLayout} from '../layouts/main'

import {Container} from '../components/container'
import {PageTitle} from '../utils'
import {Article} from '../components/article-list'

const ProjectsPage = () => {
  return <MainLayout>
    <PageTitle chunks={['Projects']} />
    <Container>
      <h2>Projects</h2>
      <StaticQuery
        query={graphql`
          query ProjectsPageQuery{
            projects: allMarkdownRemark(
              filter: {fields: {layout: {eq: "project"}}},
              sort: {fields: [frontmatter___year], order: DESC}
            ){
              edges{
                node{
                  frontmatter{
                    title
                    lead
                    category
                    year
                  }
                  fields{
                    slug
                  }
                }
              }
            }
          }
        `}
        render={(data: {
          projects: {
            edges: {
              node: {
                frontmatter: {
                  title: string
                  lead: string
                  category: string
                  year: string
                }
                fields: {
                  slug: string
                }
              }
            }[]
          }
        }) => {
          let categories: string[] = []
          let projectsPerCategory: {[category: string]: {
            node: {
              frontmatter: {
                title: string
                lead: string
                category: string
                year: string
              }
              fields: {
                slug: string
              }
            }
          }[]} = {}

          let projects = data.projects.edges

          projects.forEach((project)=> {
            if(categories.indexOf(project.node.frontmatter.category) === -1){
              categories.push(project.node.frontmatter.category)
            }

            if(!projectsPerCategory[project.node.frontmatter.category]){
              projectsPerCategory[project.node.frontmatter.category] = []
            }

            projectsPerCategory[project.node.frontmatter.category].push(project)
          })



          return categories.map((category) => {
            return <div>
              <h3>{category}</h3>
              <Masonry>
                {projectsPerCategory[category].map((project) => {
                  return <Article>
                    <h3><Link to={project.node.fields.slug}>{project.node.frontmatter.title}</Link></h3>
                    <h4>{project.node.frontmatter.year}</h4>
                    <p>{project.node.frontmatter.lead}</p>
                  </Article>
                })}
              </Masonry>
            </div>
          })
        }}
      />
    </Container>
  </MainLayout>
}

export default ProjectsPage
