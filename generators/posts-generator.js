const addAction = require('./utils').addAction

module.exports = plop => {
  plop.setGenerator('posts', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Title'
      },
      {
        type: 'input',
        name: 'lead',
        message: 'Lead'
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Tags (Comma Seperated)'
      },
      {
        type: 'confirm',
        name: 'draft',
        message: 'Draft?',
        default: false
      }
    ],
    actions: data => {
      return [
        addAction(data, '../src/content/posts/', 'templates/post.template', true)
      ]
    }
  })
}
