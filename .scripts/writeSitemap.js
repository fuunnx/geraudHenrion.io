const fs = require('fs-extra')
const path = require('path')
const mkdirp = require('mkdirp')

const getSitemap = require('./getSitemap')
const TEMP_PATH = path.join(process.cwd(), '.scripts/temp')
const BUILD_PATH = path.join(process.cwd(), 'dist')

mkdirp.sync(BUILD_PATH)
mkdirp.sync(TEMP_PATH)

module.exports = function writeSitemap () {
  return getSitemap()
    .then(sitemap => `
export const sitemap = {
  ${sitemap.map(page => `"${page.route}": {
    "route": "${page.route}",
    "module": "${page.module}",
    "loadModule": () => System.import("${page.module}"),
  }`)}
}
export default sitemap
    `)
    .then(x => writeFile(path.resolve(TEMP_PATH, 'sitemap.js'), x))
    .catch((err) => console.error(err)) // eslint-disable-line
}

function writeFile (fileName, content) {
  const dirName = path.dirname(fileName)
  return mkdirpPromise(dirName)
    .then(function () {return fs.writeFile(fileName, content)})
    .catch(function (err) {console.error(err)}) // eslint-disable-line
}
const mkdirpPromise = function (dirName) {
  return new Promise(function (resolve, reject) {
    mkdirp(dirName, function (err) {err ? reject(err) : resolve(true)})
  })
}
