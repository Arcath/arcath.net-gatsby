import styled from '@emotion/styled'


export const Grid = styled.div`
  font-size:1.2rem;
  display:grid;
  grid-template-columns:
    minmax(0.6rem, 1fr)
    minmax(0.6rem, 1fr)
    minmax(auto, 60ch)
    minmax(0.6rem, 1fr)
    minmax(0.6rem, 1fr)
  ;
`

export const BoxGrid = styled.div<{targetWidth: number}>`
  ${({targetWidth}) => {
    return `
      display:grid;
      grid-template-columns:repeat(auto-fit, minmax(${targetWidth}px, 1fr));
      grid-gap:10px;
    `
  }}
`

export const WideGrid = styled(Grid)<{wideHeading?: boolean}>`
  h2{
    grid-column:${({wideHeading}) => wideHeading ? '2/5' : '3'};
  }

  & > div{
    grid-column:2/5;
  }
`

export const ArticleGrid = styled(Grid)`
  p, h1, h2, h3, h4, h5, h6, ul, ol, div, blockquote{
    grid-column: 3;
  }

  table{
    grid-column: 2 / 5;
  }

  p.full-width{
    grid-column 1 / 6;
  }

  img{
    grid-column 1 / 6;
  }

  div.gatsby-highlight{
    grid-column: 1 / 6;

    pre{
      display:grid;
      grid-template-columns:
        minmax(0.6rem, 1fr)
        minmax(auto, 90ch)
        minmax(0.6rem, 1fr)
      ;
      }

      code{
        grid-column:2;
      }
  }
`

export const ArticleListGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap:10px;
  width:100%;
`
