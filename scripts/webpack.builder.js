var webpack = require('webpack')
var baseConfig = require('webpack.shared')
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
    nodeModules[mod] = 'commonjs ' + mod //eslint-disable-line
  })

var webpackConfig = merge(baseConfig, {
  watch: false,
  cache: true,
  debug: true,
  target: 'node',
  entry: path.resolve('scripts/builder/index.js'),
  devtool: 'inline-source-map',

  output: merge(baseConfig.output, {
    filename: 'index.js',
    path: path.resolve('script/builder/dist'),
  }),

  module: {
    loaders: concat(baseConfig.module.loaders || [], [
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

  plugins: concat(baseConfig.plugins || [], [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new Extract('styles.css', {allChunks: true}),
  ]),
})

module.exports = webpackConfig // eslint-disable-line
