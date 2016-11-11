'use strict'

var fs = require('fs-extra')
var path = require('path')
var mkdirp = require('mkdirp')
var webpack = require('webpack')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var glob = require('glob-promise')
var baseConfig = require('../webpack.common')
var merge = require('ramda').merge
var ExtractTextPlugin = require('extract-text-webpack-plugin')


var TEMP_PATH = path.join(process.cwd(), '.scripts/temp')
var BUILD_PATH = path.join(process.cwd(), 'dist')
var PAGES_GLOB = path.join(process.cwd(), 'pages/**/index.js')


mkdirp.sync(BUILD_PATH)
mkdirp.sync(TEMP_PATH)


var config = merge(baseConfig, {
  target: 'node',
  cache: false,
  output: {
    filename: 'index.js',
    path: TEMP_PATH,
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd',
  },
  node : {
    '__dirname': '/',
    '../package.json': 'empty',
  },
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader'
        ),
      },
    ]),
  },

  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.RUN_CONTEXT': JSON.stringify('node'),
    }),
    new ExtractTextPlugin('styles.css', {allChunks: true}),
  ],
})

const outputOptions = {
  exclude: ['node_modules', 'bower_components', 'jam', 'components'],
  errorDetails: true,
  chunks: false,  // Makes the build much quieter
  colors: true,
}

var lastHash = null
webpack(config).run(function (err, stats) {
  Error.stackTraceLimit = 30 // eslint-disable-line
  if(err) {
    lastHash = null
    console.error(err.stack || err) // eslint-disable-line
    if(err.details) console.error(err.details) // eslint-disable-line
    process.on('exit', function() {
      process.exit(1) // eslint-disable-line
    })
    return
  }

  if(stats.hash !== lastHash) {
    lastHash = stats.hash
    process.stdout.write(stats.toString(outputOptions) + '\n')

    var app = require(TEMP_PATH).default
    glob(PAGES_GLOB)
      .then(function (paths) {
        paths.map(function (x) {return x.replace(path.resolve('./pages'), '')})
          .map(function (x) {return x.replace('/index.js', '')})
          .forEach(function (url) {
            console.log(url)
            app({path: url}, function (err, markup) {
              if (err) console.error(err) //eslint-disable-line
              else writeFile(path.join(BUILD_PATH, url + '.html'), markup)
            })
          })
      })
  }
})

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
