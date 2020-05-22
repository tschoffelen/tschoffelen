const visit = require('unist-util-visit')
const fountain = require('../../src/utils/fountain')

module.exports = async ({ markdownAST }) => {
  visit(markdownAST, 'code', node => {
    let language = node.meta ? node.lang + node.meta : node.lang
    if (language !== 'fountain') {
      return
    }

    node.type = 'html'
    node.value = `
      <div class="fountain-body fountain-body-inline">
        ${fountain(node.value).html.script}
      </div>
    `
  })

  return markdownAST
}
