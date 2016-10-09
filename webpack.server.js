var webpack = require('webpack')
var sharedConfig = require('./webpack.shared')
var merge = require('ramda').merge
var concat = require('ramda').concat
var path = require('path')
var fs = require('fs')
var Extract = require('extract-text-webpack-plugin')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

var webpackConfig = merge(sharedConfig, {
  watch: false,
  cache: true,
  debug: false,
  target: 'node',
  entry: './builder.js',

  output: merge(sharedConfig.output, {
    filename: 'builder.js',
    path: path.resolve('./dist'),
  }),

  module: {
    loaders: concat(sharedConfig.module.loaders || [], [
      {
        test: /\.css$/,
        loader: Extract.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        ),
      },
    ]),
  },

  externals: nodeModules,

  plugins: concat(sharedConfig.plugins || [], [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new Extract('styles.css', {allChunks: true}),
  ]),
})

module.exports = webpackConfig
