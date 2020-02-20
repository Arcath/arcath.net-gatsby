import {css} from '@emotion/core'
import {dimensions, fonts, Colors, breakpoints} from './variables'
import {getEmSize} from './mixins'

require('typeface-montserrat')
require('typeface-open-sans')
require('typeface-martel')

export const globalCSS = css`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 1rem !important;
    line-height: ${dimensions.lineHeight.regular} !important;
  }

  body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    font-family: ${fonts.body};
    font-weight:200;
    color: ${Colors.primary.text};
    background-color: ${Colors.primary.background};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    padding:0;
    margin:0;
    line-height:23.5px;
  }

  a {
    color: ${Colors.brand.dark};
    text-decoration: none;
    transition: color 0.2s;

    &:hover,
    &:focus {
      color: ${Colors.brand.light};
    }
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  table {
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid ${Colors.brand.light};
    font-size: 85%;
    border-collapse: collapse;
  }

  td,
  th {
    padding: .25rem .5rem;
    border: 1px solid ${Colors.brand.light};
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      &:nth-child(odd) {

      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.414rem;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: ${dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
    font-family: ${fonts.headings};
  }

  h1 {
    margin-top: 0;
    font-size: ${dimensions.headingSizes.h1}rem;
  }

  h2 {
    font-size: ${dimensions.headingSizes.h2}rem;
  }

  h3 {
    font-size: ${dimensions.headingSizes.h3}rem;
  }

  h4, h5, h6 {
    font-size: ${dimensions.headingSizes.h4}rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  strong {
    color: ${Colors.primary.black};
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: .5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid ${Colors.brand.light};
  }

  blockquote {
    margin: .8rem 0;
    padding: .5rem 1rem;
    border-left: .25rem solid ${Colors.brand.light};
    color: ${Colors.primary.gray};

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${getEmSize(breakpoints.md)}em) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }
`
