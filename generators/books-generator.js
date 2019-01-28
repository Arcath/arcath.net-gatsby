const addAction = require('./utils').addAction

module.exports = plop => {
  plop.setGenerator('books', {
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Title'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      },
      {
        type: 'input',
        name: 'link',
        message: 'Amazon Link'
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
        addAction(data, '../src/content/books/', 'templates/books.template')
      ]
    }
  })
}
