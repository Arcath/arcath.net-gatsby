const path = require('path')

module.exports = async ({graphql, actions}) => {
  const {createPage} = actions

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
              tags
            }
          }
        }
      }

      posts: allMarkdownRemark(
        filter: {fields: {layout: {glob: "+(post|book|note)"}}},
        sort: {fields: [fields___date], order: DESC}
      ){
        edges{
          node{
            fields{
              slug
            }
          }
        }
      }
    }
  `)

  if(allMarkdown.errors){
    throw new Error(allMarkdown.errors)
  }

  let allTags = []

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
    const {slug, layout, tags} = node.fields

    if(tags){
      tags.forEach((tag) => {
        if(allTags.indexOf(tag) < 0){
          allTags.push(tag)
        }
      })
    }

    let next
    let previous

    if(layout === 'post'){
      let postIndex = 0
      allMarkdown.data.posts.edges.forEach(({node}, i) => {
        if(node.fields.slug === slug){
          postIndex = i
        }
      })

      next = allMarkdown.data.posts.edges[postIndex - 1]
      previous = allMarkdown.data.posts.edges[postIndex + 1]
    }else{
      next = allMarkdown.data.posts.edges[Math.floor(Math.random() * allMarkdown.data.posts.edges.length)]
      previous = allMarkdown.data.posts.edges[Math.floor(Math.random() * allMarkdown.data.posts.edges.length)]
    }


    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        slug,
        next: (next ? next.node.fields.slug : '/'),
        previous: (previous ? previous.node.fields.slug : '/')
      }
    })
  })

  allTags.forEach((tag) => {
    createPage({
      path: '/articles/' + tag.toLowerCase(),
      component: path.resolve('./src/templates/tag.tsx'),
      context: {
        tag
      }
    })
  })
}
