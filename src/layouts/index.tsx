import * as React from 'react'
import styled from 'react-emotion'
import {rgba} from 'polished'
import {StaticQuery, graphql, Link} from 'gatsby'
import {Helmet} from 'react-helmet'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, IconDefinition, faGithub} from '@fortawesome/free-brands-svg-icons'
import {format} from 'date-fns'

import '../styles/normalize'
import {colors} from '../styles/variables'
import 'prism-themes/themes/prism-vs.css'

import {Root, Container, ThirdContainer} from '../components/container'
import {Strip} from '../components/strip'

import cc from '../static/img/cc.png'
import badge from '../static/img/badge.png'

const Footer = styled(Container)`
  border-top:${rgba(colors.gray, 0.2)} 1px solid;
`

const RecentLinks = styled('ul')`
  list-style:none;
  margin:0;
  padding:0;

  li{
    padding:5px;
  }
`

const SocialLinks = styled('div')`
  svg{
    width:50px !important;
    height:50px;
    padding-right:10px;
  }
`

interface StaticQueryProps{
  site: {
    siteMetadata: {
      title: string
      description: string
      author: {
        social: {
          twitter: string
          github: string
        }
      }
    }
  }

  recentPosts: {
    edges: {
      node: {
        frontmatter: {
          title: string
          date: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const IndexLayout: React.SFC<{expanded?: boolean, icon?: IconDefinition, color?: string}> = ({children, expanded, icon, color}) => {
  return <StaticQuery
    query={graphql`
      query IndexLayoutQuery{
        site{
          siteMetadata{
            title
            description
            author{
              social{
                twitter
                github
              }
            }
          }
        }

        recentPosts: allMarkdownRemark(
          filter: {fields: {layout: {eq: "post"}}},
          sort: {fields: [fields___date], order: DESC},
          limit: 5
        ){
          edges{
            node{
              fields{
                slug
              }
              frontmatter{
                title
                date
              }
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => {
      return <Root>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {name: 'theme-color', content: (color ? color : colors.brand)}
          ]}
          link={[
            {rel: 'icon', type: 'image/png', href: badge}
          ]}
        />
        <Strip expanded={expanded} title={data.site.siteMetadata.title} icon={icon} color={color} />
        {children}
        <Footer>
          <ThirdContainer>
            <h6>{data.site.siteMetadata.title}</h6>
            <SocialLinks>
              <a href={data.site.siteMetadata.author.social.twitter}><FontAwesomeIcon icon={faTwitter} /></a>
              <a href={data.site.siteMetadata.author.social.github}><FontAwesomeIcon icon={faGithub} /></a>
            </SocialLinks>
          </ThirdContainer>
          <ThirdContainer>
            <h6>Recent Articles</h6>
            <RecentLinks>
              {data.recentPosts.edges.map((edge) => {
                return <li key={edge.node.fields.slug}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link> {format(edge.node.frontmatter.date, 'DD/MM/YY')}</li>
              })}
            </RecentLinks>
          </ThirdContainer>
          <ThirdContainer>
            <h6>Disclaimer</h6>
            <p>All content is my own unless otherwise stated.</p>
            <p>
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                <img src={cc} />
              </a>
            </p>
          </ThirdContainer>
        </Footer>
      </Root>
    }}
  />
}

export default IndexLayout
