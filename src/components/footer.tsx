import * as React from 'react'
import styled from '@emotion/styled'
import {StaticQuery, graphql, Link} from 'gatsby'
import {OutboundLink} from 'gatsby-plugin-google-gtag'

import cc from '../static/img/cc.png'

import {Block} from './blocks'
import {Colors, Dimensions} from '../styles/variables'


const Me = styled('img')`
  border-radius:${Dimensions.sizes.padding / 2}px;
  float:left;
  margin-right:${Dimensions.sizes.margin}px;
`

const ContactBlock = styled(Block)`
  float:left;
  clear:both;
  width:100%;
  margin-top:${Dimensions.sizes.margin}px;
  margin-bottom:${Dimensions.sizes.margin * 2}px;

  a{
    color:${Colors.accents.purple};
  }
`

const ContactHeading = styled('h3')`
  margin-top:0;
`

const SocialList = styled('ul')`
  margin:0;
  padding:0;
  overflow:auto;
  list-style:none;

  li{
    float:left;
    margin-right:${Dimensions.sizes.margin}px;

    a{
      color:${Colors.primary.white};
    }
  }
`

const Legal = styled('div')`
  float:right;
`

interface FooterData{
  site: SiteMetadata<
    "author" | "title" | "description",
    "social",
    "twitter" | "github" | "dev" | "medium"
  >

  me: {
    childImageSharp: {
      fixed: {
        src: string
      }
    }
  }
}

export const Footer = () => {
  return <StaticQuery
    query={graphql`
      query FooterQuery{
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

        me: file(relativePath: {eq: "img/me.jpg"}){
          childImageSharp{
            fixed(width: 150, height: 150, quality: 100){
              src
            }
          }
        }
      }
    `}
    render={(data: FooterData) => {
      return <ContactBlock>
        <Me src={data.me.childImageSharp.fixed.src} alt="A picture of me" />
        <Legal>
          <ContactHeading>Disclaimer</ContactHeading>
          <p>All content is my own unless otherwise stated.</p>
          <p>My content is licensed under the <OutboundLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA 4.0</OutboundLink> license</p>
          <p>
            <OutboundLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              <img src={cc} alt="cc by-nc-sa" />
            </OutboundLink>
          </p>
        </Legal>
        <ContactHeading>{data.site.siteMetadata.title}</ContactHeading>
        <p>{data.site.siteMetadata.description} <Link to='/about'>More</Link></p>
        <SocialList>
          <li><OutboundLink href={data.site.siteMetadata.author.social.github}>Github</OutboundLink></li>
          <li><OutboundLink href={data.site.siteMetadata.author.social.twitter}>Twitter</OutboundLink></li>
          <li><OutboundLink href={data.site.siteMetadata.author.social.dev}>Dev</OutboundLink></li>
          <li><OutboundLink href={data.site.siteMetadata.author.social.medium}>Medium</OutboundLink></li>
        </SocialList>
      </ContactBlock>
    }}
  />
}
