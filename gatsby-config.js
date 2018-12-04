'use strict'

module.exports = {
  siteMetadata: {
    title: 'Adam Laycock',
    description: 'IT Engineer, Developer & Blogger.',
    siteUrl: 'https://arcath.net',
    author: {
      name: 'Adam Laycock',
      about: 'I am an IT Engineer & Software Developer from the North West of England. I work for a small company supporting Primary Schools in Lancashire & Cumbria. Through this work I build websites and other software.',
      email: 'adam@arcath.net',
      social: {
        twitter: 'https://www.twitter.com/ArcathWhitefall',
        github: 'https://www.github.com/Arcath'
      }
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-75492019-1'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                fullWidthImage: {
                  classes: 'full-width-image'
                },
                floatLeft: {
                  classes: 'float-left'
                },
                figure: {
                  classes: 'figure'
                }
              }
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1920,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://arcath.net'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
