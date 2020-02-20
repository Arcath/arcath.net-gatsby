import * as React from 'react'
import styled from '@emotion/styled'
import {Link, graphql, useStaticQuery} from 'gatsby'
import {Helmet} from 'react-helmet'
import {Global} from '@emotion/core'

import {WideGrid} from '../components/grid'

import {Colors, Dimensions} from '../styles/variables'
import {Container} from '../components/container'
import {Footer} from '../components/footer'

import badge from '../../static/512.png'

import {globalCSS} from '../styles/normalize'
import 'prism-themes/themes/prism-vs.css'

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

const MAIN_LAYOUT_QUERY = graphql`
  query MainLayoutHeading{
    site{
      siteMetadata{
        title
        description
      }
    }
  }
`

export const MainLayout: React.SFC<{container?: boolean}> = ({children, container}) => {
  const data = useStaticQuery(MAIN_LAYOUT_QUERY)

  return <Main>
    <Global styles={globalCSS} />
    <Helmet
      meta={[
        {name: 'theme-color', content: Colors.brand.dark},
        {name: 'google-site-verification', content: 'qi2oRAc2fmvBL1qOVY4CgICdWCmZZJhKtkzgd1knYG4'},
        {name: 'description', content: data.site.siteMetadata.description}
      ]}
      link={[
        {rel: 'icon', type: 'image/png', href: badge}
      ]}
      htmlAttributes={{
        lang: 'en'
      }}
    />
    <Header role="banner">
      <WideGrid>
        <div>
          <h1>
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </h1>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/uses">Uses</Link></li>
            <li><Link to="/articles">Posts</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </WideGrid>
    </Header>
    {
      container
      ? <Container role="main">{children}</Container>
      : children
    }
    <WideGrid>
      <Footer />
    </WideGrid>
  </Main>
}
