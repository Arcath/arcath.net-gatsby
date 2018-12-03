import styled from 'react-emotion'
import {clearFix} from 'polished'

import {breakpoints, widths, dimensions} from '../styles/variables'
import {getEmSize} from '../styles/mixins'
import {Tag} from './article-list'

export const Container = styled('div')`
  margin:auto;
  width:${widths.xl}px;
  position:relative;
  ${clearFix()}

  @media(max-width: ${getEmSize(breakpoints.sm)}){
    width: calc(100vw - 0.4em) !important;
    padding:0.2em;
  }

  @media(max-width: ${getEmSize(breakpoints.xl)}){
    width:${widths.lg}px;
  }

  .full-width-image{
    width:100vw;
    position:relative;
    left:50%;
    right:50%;
    margin-left:-50vw;
    margin-right:-50vw;
  }
`

export const ContentContainer = styled(Container)`
  font-size:${dimensions.fontSize.body}px;

  a{
    color:${(props: {color: string}) => props.color};
  }

  ${Tag}{
    background-color:${(props: {color: string}) => props.color};
  }

  blockquote{
    border-left-color:${(props: {color: string}) => props.color};
  }
`

export const Root = styled('div')`
  display:flex;
  flex-direction: column;
  min-height:100vh;
`

export const ThirdContainer = styled('div')`
  width:30%;
  margin:1.5%;
  float:left;

  @media(max-width: ${getEmSize(breakpoints.sm)}){
    width: calc(100vw - 0.4em - 10px) !important;
    margin:0.2em;
  }
`
export const Slider = styled('div')`
  overflow-y:hidden;

`
