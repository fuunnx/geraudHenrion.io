const glob = require('glob-promise')
const path = require('path')
const PAGES_GLOB = path.join(process.cwd(), 'app/pages/**/*.js')

module.exports = function getSitemap () {
  return glob(PAGES_GLOB)
    .then(paths =>
      paths
        .filter(x => !x
          .replace(path.resolve('./app/pages'))
          .match(/\/_/gi)
        )
        .map(module => ({
          module,
          route: module
            .replace(path.resolve('./app/pages'), '')
            .replace(/\/index.js$/, '')
            .replace(/.js$/, ''),
        })
      )
    )
    .catch((err) => console.error(err)) // eslint-disable-line
}
