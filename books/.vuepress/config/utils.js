const container = require('markdown-it-container')

module.exports = {
  addContainer: (md, name, el = 'div') => {
    md.use(container, name, {
      render: (tokens, idx) => tokens[idx].nesting === 1 
        ? `<${el} class="container ${name}">\n` 
        : `</${el}>\n`
    })
  },

  addPageClass: ($page) => {
    if ($page.frontmatter.pageClass)
        return

    const permalink = $page.frontmatter.permalink || $page.path

    if (permalink) {
        const cleanClass = permalink.replace(/\//g, '')

        if (cleanClass) {
            $page.frontmatter.pageClass = cleanClass
        }
    }
  },
}