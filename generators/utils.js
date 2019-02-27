module.exports = {
  addAction: (data, path, templateFile, datePrefix = false) => {
    data.date = new Date().toISOString()

    let output = path

    if(datePrefix){
      output += data.date.split('T')[0]
      output += '-'
    }

    output += module.exports.dashCase(data.title)

    if(data.draft){
      output += '-draft'
    }

    output += '/index.md'

    if(data.tags){
      data.tags = `tags:\n  - ${data.tags.split(',').join('\n  - ')}`
    }

    return {
      type: 'add',
      path: output,
      templateFile
    }
  },
  dashCase: (string) => {
    return string.replace(/ /g, '-').toLowerCase()
  }
}
