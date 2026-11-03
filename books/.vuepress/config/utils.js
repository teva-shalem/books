const container = require('markdown-it-container')

module.exports = {
  addContainer: (md, name, el = 'div') => {
    md.use(container, name, {
      render: (tokens, idx) => tokens[idx].nesting === 1 
        ? `<${el} class="container ${name}">\n` 
        : `</${el}>\n`
    })
  }
}