const path = require('path')
const PAGES_GLOB = path.join(process.cwd(), 'app/pages/**/*.js')
const watch = require('glob-watcher')
const writeSitemap = require('./writeSitemap')

writeSitemap()
  .then(() => {
    return watch(PAGES_GLOB).on('all', () => writeSitemap())
  })
