'use strict'

module.exports = {
  siteMetadata: {
    title: 'Adam Laycock',
    description: 'IT Engineer, Developer & Blogger.',
    siteUrl: 'https://www.arcath.net',
    author: {
      name: 'Adam Laycock',
      about: 'I am an IT Engineer & Software Developer from the North West of England. I work for a small company supporting Primary Schools in Lancashire & Cumbria. Through this work I build websites and other software.',
      email: 'adam@arcath.net',
      social: {
        twitter: 'https://www.twitter.com/ArcathWhitefall',
        twitterHandle: '@ArcathWhitefall',
        github: 'https://www.github.com/Arcath',
        instagram: 'https://www.instagram.com/arcathwhitefall/',
        youtube: 'https://www.youtube.com/channel/UCl1Mn3_rVPbheyk_aOXFrSA'
      }
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-75492019-1"
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
          respectDNT: true
        },
      },
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
              linkImagesToOriginal: false,
              withWebp: true
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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Adam Laycock',
        short_name: 'arcath.net',
        start_url: '/',
        background_color: '#a55eea',
        theme_color: '#a55eea',
        display: 'minimal-ui',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: 'en'
          }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          {name: 'title', store: true, attributes: {boost: 20}},
          {name: 'content'},
          {name: 'url', store: true},
          {name: 'lead', store: true},
          {name: 'date', store: true},
          {name: 'layout', store: true},
          {name: 'tags', store: true}
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            content: node => node.rawMarkdownBody,
            url: node => node.fields.slug,
            lead: node => node.frontmatter.lead,
            date: node => node.frontmatter.date,
            layout: node => node.fields.layout,
            tags: node => node.frontmatter.tags
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.frontmatter.title || 'New post by Adam Laycock',
                    description: edge.node.fields.lead || edge.node.excerpt,
                    date: edge.node.fields.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [{ 'content:encoded': edge.node.html }]
                  }
                )
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 10,
                  filter: {
                    fields: {slug: {regex: "/^\/20/"}}
                  },
                  sort: {fields: [fields___date], order: DESC}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                        lead
                        date
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            feedTitle: 'All posts by Adam Laycock'
          }
        ]
      }
    }
  ]
}
