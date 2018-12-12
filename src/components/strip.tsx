import * as React from 'react'
import styled from '@emotion/styled'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper, faChevronCircleDown, IconDefinition, faSearch} from '@fortawesome/free-solid-svg-icons'
import {Link, StaticQuery, graphql} from 'gatsby'
import {darken} from 'polished'
import {Swiper, Slide} from 'react-dynamic-swiper'

import 'react-dynamic-swiper/lib/styles.css'

import {Container} from './container'
import {colors, fonts, breakpoints} from '../styles/variables'
import {getEmSize} from '../styles/mixins'
import {formatAsDate} from '../utils'


interface BlockProps{
  color: string
  height: string
}

const BlockLink = styled(Link)`
  width:30%;
  margin:1.5%;
  color:${colors.white};
  display:block;
  text-align:center;
  padding:10px;
  line-height:20px;
  float:left;
  transition:background-color 0.2s;

  &:nth-of-type(3n-2){
    margin-left:0;
    margin-right:3%;
  }

  &:nth-of-type(3){
    margin-left:3%;
    margin-right:0;
  }

  @media(max-width: ${getEmSize(breakpoints.sm)}){
    width: 100%;
    padding:0.2em;
    box-sizing:border-box;
    margin:0 !important;
    margin-bottom:1.5% !important;
  }
`

const BlockPost = styled(BlockLink)`
  height: 40vh;
`

const Block = styled('div')`
  background-color:${(props: BlockProps) => props.color};
  overflow:hidden;
  width:100%;
  height:${(props: BlockProps) => props.height};
  transition:height 1s ease-out;
  font-family:${fonts.components};

  a{
    color:${colors.white};
  }

  ${BlockLink}, ${BlockPost}{
    background-color:${(props: BlockProps) => darken(0.1, props.color)};
  }

  @media(max-width: ${getEmSize(breakpoints.sm)}){
    width: 100vw;
  }
`

const Logo = styled('div')`
  height:8vh;
  width:8vh;
  display:inline-block;
  margin-top:1vh;
  color:${colors.white};
  float:left;

  svg{
    width:100% !important;
    height:100%;
  }
`

const Title = styled('h1')`
  float:left;
  margin-top:1vh;
  margin-left:1vh;
  font-size:6vh;
`

const Expand = styled('div')`
  float:right;
  margin-top:3vh;
  width:4vh;
  height:4vh;
  cursor:pointer;
  color:${colors.white};
  transform:rotate(${(props: {expanded: boolean}) => {
    return (props.expanded ? '180' : '0')
  }}deg);
  transition:transform 1s ease-out;

  svg{
    width:100% !important;
    height:100%;
  }
`

const DateLine = styled('p')`
  font-weight:200;
`

const SearchButton = styled(Link)`
  float:right;
  margin-top:3vh;
  width:4vh;
  height:4vh;
  cursor:pointer;
  color:${colors.white};
  margin-right:3vh;

  @media(max-width: ${getEmSize(breakpoints.sm)}){
    margin-right:0;
  }

  svg{
    width:100% !important;
    height:100%;
  }
`

type StripProps = {expanded?: boolean, title: string, icon?: IconDefinition, color?: string}

export class Strip extends React.Component<StripProps, {expanded: boolean, width: number}>{
  constructor(props: StripProps){
    super(props)

    this.state = {
      expanded: (this.props.expanded ? true : false ),
      width: 1000
    }
  }

  componentDidMount(){
    this.setState({width: window.innerWidth})
    window.addEventListener('resize', () => this.onResize())
  }

  componentWillUnmount(){
    window.removeEventListener('resize', () => this.onResize())
  }

  onResize(){
    this.setState({width: window.innerWidth})
  }

  render(){
    let {title, icon, color} = this.props
    let {expanded} = this.state

    return <Block color={(color ? color : colors.brand)} height={expanded ? '100vh' : '10vh'}>
    <Container>
      <Logo>
        <FontAwesomeIcon icon={icon ? icon : faNewspaper} />
      </Logo>
      <Title><Link to="/">{title}</Link></Title>
      <Expand expanded={expanded} onClick={() => {
        this.setState({expanded: !this.state.expanded})
      }} >
        <FontAwesomeIcon icon={faChevronCircleDown} />
      </Expand>
      <SearchButton to="/search"><FontAwesomeIcon icon={faSearch} /></SearchButton>
    </Container>
    <Container>
      <BlockLink to="/">
        Home
      </BlockLink>
      <BlockLink to='/about'>
        About
      </BlockLink>
      <BlockLink to='/contact'>
        Contact
      </BlockLink>
    </Container>
    <Container>
      <h3>Featured Posts</h3>
      <StaticQuery
        query={graphql`
          query StripQuery{
            featuredPosts: allMarkdownRemark(
              filter: {fields: {layout: {eq: "post"}}, frontmatter: {tags: {in: "Featured"}}},
              sort: {fields: [fields___date], order: DESC},
              limit: 3
            ){
              edges{
                node{
                  frontmatter{
                    title
                    lead
                    date
                  }
                  fields{
                    date
                    slug
                  }
                }
              }
            }
          }
        `}
        render={(data: {
          featuredPosts: {
            edges: {
              node: {
                frontmatter: {
                  title: string
                  lead: string
                  date: string
                }
                fields: {
                  slug: string
                }
              }
            }[]
          }
        }) => {
          let posts = data.featuredPosts.edges.map((edge, i) => {
            return <BlockPost to={edge.node.fields.slug} key={i}>
              <h6>{edge.node.frontmatter.title}</h6>
              <DateLine>{formatAsDate(edge.node.frontmatter.date)}</DateLine>
              <p>{edge.node.frontmatter.lead}</p>
            </BlockPost>
          })

          if(this.state.width < breakpoints.sm){
            return <Swiper
              navigation={false}
              pagination={false}
            >
              {posts.map((post, i) => {
                  return <Slide key={i}>
                    {post}
                  </Slide>
                })
              }
            </Swiper>
          }

          return posts
        }}
      />
    </Container>
    <Container>
      <BlockLink to='/articles/featured'>
        More Featured
      </BlockLink>
      <BlockLink to='/articles'>
        All Articles
      </BlockLink>
      <BlockLink to='/articles/screeps'>
        Screeps
      </BlockLink>
    </Container>
  </Block>
  }
}
