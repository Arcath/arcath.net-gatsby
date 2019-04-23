import * as React from 'react'
import styled from '@emotion/styled'
import {Link, StaticQuery, graphql} from 'gatsby'
import {Helmet} from 'react-helmet'

import {Colors, Dimensions} from '../styles/variables'
import {Container} from '../components/container'
import {Footer} from '../components/footer'

import badge from '../../static/512.png'

import '../styles/normalize'

const Main = styled('div')`

`

const Header = styled('header')`
  background:linear-gradient(${Dimensions.lightsource}, ${Colors.brand.light}, ${Colors.brand.dark});

  h1{
    float:left;
    font-size:${Dimensions.fontSizes.header.title}px;
    margin-top:${Dimensions.sizes.margin}px;

    a{
      color:${Colors.primary.white};
    }
  }

  ul{
    float:right;
    margin:0;
    padding:0;
    list-style:none;

    li{
      float:left;
      margin:${Dimensions.sizes.margin}px;

      a{
        color:${Colors.primary.white};
        font-size:${Dimensions.fontSizes.header.links}px;
      }
    }
  }
`

export const SiteHelmet = () => {
  return  <Helmet
    meta={[
      {name: 'theme-color', content: Colors.brand.dark},
      {name: 'google-site-verification', content: 'qi2oRAc2fmvBL1qOVY4CgICdWCmZZJhKtkzgd1knYG4'}
    ]}
    link={[
      {rel: 'icon', type: 'image/png', href: badge}
    ]}
    htmlAttributes={{
      lang: 'en'
    }}
  />
}

export const MainLayout: React.SFC<{container?: boolean}> = ({children, container}) => (
  <Main>
    <SiteHelmet />
    <Header role="banner">
      <Container>
        <h1>
          <Link to="/">
            <StaticQuery query={graphql`
              query MainLayoutHeading{
                site{
                  siteMetadata{
                    title
                  }
                }
              }
            `}
            render={(data) => data.site.siteMetadata.title}
            />
          </Link>
        </h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/articles">Posts</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </Container>
    </Header>
    {
      container
      ? <Container role="main">{children}</Container>
      : children
    }
    <Container>
      <Footer />
    </Container>
  </Main>
)
