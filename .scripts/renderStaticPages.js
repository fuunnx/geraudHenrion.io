'use strict'

const fs = require('fs-extra')
const path = require('path')
const mkdirp = require('mkdirp')
const exec = require('child_process').exec
const writeSitemap = require('./writeSitemap')
const getSitemap = require('./getSitemap')


const TEMP_PATH = path.join(process.cwd(), '.scripts/temp')
const BUILD_PATH = path.join(process.cwd(), 'dist')

mkdirp.sync(BUILD_PATH)
mkdirp.sync(TEMP_PATH)
// node: {
//   '__dirname': '/',
//   '../package.json': 'empty',
// },

writeSitemap()
  .then(() => exec('webpack --env static', afterWebpack))

function afterWebpack (error, stdout) {
  console.log(stdout)
  if(error) throw error

  const app = require(TEMP_PATH).default
  getSitemap()
    .then(sitemap => sitemap
      .map(path => path.route)
      .map((route) => {
        console.log({route, file: path.join(BUILD_PATH, route + '.html')})
        app({path: route}, function (err, markup) {
          if (err) console.error(err) //eslint-disable-line
          else return writeFile(path.join(BUILD_PATH, route + '.html'), markup)
        })
      })
    )
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
