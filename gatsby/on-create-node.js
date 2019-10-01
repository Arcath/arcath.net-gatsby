const POST_PATH_SLUG_PATTERN = /^posts\/([\d]{4})-([\d]{2})-([\d]{2})-(.*?)\/.*?$/
const NOTE_PATH_SLUG_PATTERN = /^notes\/([\d]{4})-([\d]{2})-([\d]{2})-(.*?)\/.*?$/
const PROJECTS_PATH_SLUG_PATTERN = /^projects\/(.*?)\/.*?$/
const BOOKS_PATH_SLUG_PATTERN = /^books\/(.*?)\/.*?$/

module.exports = ({node, actions, getNode}) => {
  const {createNodeField} = actions

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      let {permalink, layout, lead, date, tags} = node.frontmatter
      const {relativePath} = getNode(node.parent)

      let slug = permalink

      if(!slug){
        if(relativePath.includes('posts')){
          let matches = POST_PATH_SLUG_PATTERN.exec(relativePath)

          slug =  '/' + [matches[1], matches[2], matches[4]].join('/')

          if(!layout){
            layout = 'post'
          }
        }

        if(relativePath.includes('notes')){
          let matches = NOTE_PATH_SLUG_PATTERN.exec(relativePath)

          if(!layout){
            layout = 'note'
          }

          slug =  '/notes/' + [matches[1], matches[2], matches[4]].join('/')
        }

        if(relativePath.includes('projects')){
          let matches = PROJECTS_PATH_SLUG_PATTERN.exec(relativePath)

          slug =  '/projects/' + [matches[1]].join('/')

          if(!layout){
            layout = 'project'
          }
        }

        if(relativePath.includes('books')){
          let matches = BOOKS_PATH_SLUG_PATTERN.exec(relativePath)

          slug =  '/books/' + [matches[1]].join('/')

          if(!layout){
            layout = 'book'
          }
        }
      }

      createNodeField({
        node,
        name: 'slug',
        value: slug
      })

      createNodeField({
        node,
        name: 'layout',
        value: layout || 'page'
      })

      createNodeField({
        node,
        name: 'lead',
        value: lead
      })

      createNodeField({
        node,
        name: 'date',
        value: date
      })

      createNodeField({
        node,
        name: 'tags',
        value: tags
      })
    }
  }
}
