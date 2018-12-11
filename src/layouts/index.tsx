import * as React from 'react'
import styled from '@emotion/styled'
import {rgba} from 'polished'
import {StaticQuery, graphql, Link} from 'gatsby'
import {Helmet} from 'react-helmet'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, IconDefinition, faGithub, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'
import {format} from 'date-fns'
import {OutboundLink} from 'gatsby-plugin-google-gtag'

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
    width:30px !important;
    height:30px;
    padding-right:10px;
    float:left;
  }
`

const SocialLink = styled(OutboundLink)`
  width:100%;
  background-color:${(props: {color: string}) => props.color};
  height:50px;
  display:block;
  color:#fff;
  line-height:50px;
  vertical-align:middle;
  margin-bottom:10px;
  padding:10px;
  box-sizing:border-box;

  span{
    float:left;
    margin-top:-10px;
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
          instagram: string
          youtube: string
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
                instagram
                youtube
              }
            }
          }
        }

        recentPosts: allMarkdownRemark(
          filter: {fields: {layout: {glob: "+(post|book|note)"}}},
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
            {name: 'theme-color', content: (color ? color : colors.brand)},
            {name: 'description', content: data.site.siteMetadata.description},
            {name: 'google-site-verification', content: 'qi2oRAc2fmvBL1qOVY4CgICdWCmZZJhKtkzgd1knYG4'}
          ]}
          link={[
            {rel: 'icon', type: 'image/png', href: badge}
          ]}
          htmlAttributes={{
            lang: 'en'
          }}
        />
        <Strip expanded={expanded} title={data.site.siteMetadata.title} icon={icon} color={color} />
        {children}
        <Footer>
          <ThirdContainer>
            <h6>{data.site.siteMetadata.title}</h6>
            <SocialLinks>
              <SocialLink color={colors.brands.twitter} href={data.site.siteMetadata.author.social.twitter}>
                <FontAwesomeIcon icon={faTwitter} />
                <span>Twitter</span>
              </SocialLink>
              <SocialLink color={colors.brands.github} href={data.site.siteMetadata.author.social.github}>
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </SocialLink>
              <SocialLink color={colors.brands.instagram} href={data.site.siteMetadata.author.social.instagram}>
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </SocialLink>
              <SocialLink color={colors.brands.youtube} href={data.site.siteMetadata.author.social.youtube}>
                <FontAwesomeIcon icon={faYoutube} />
                <span>YouTube</span>
              </SocialLink>
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
            <p>My content is licensed under the <OutboundLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA 4.0</OutboundLink> license</p>
            <p>
              <OutboundLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                <img src={cc} alt="cc by-nc-sa" />
              </OutboundLink>
            </p>
          </ThirdContainer>
        </Footer>
      </Root>
    }}
  />
}

export default IndexLayout
