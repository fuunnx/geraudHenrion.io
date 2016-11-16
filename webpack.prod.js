var webpack = require('webpack')
var baseConfig = require('./webpack.common')
var merge = require('ramda').merge
var concat = require('ramda').concat


var webpackConfig = merge(baseConfig, {
  devtool: 'eval-cheap-module-source-map',
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ]),
  },

  plugins: concat(baseConfig.plugins, [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ]),
})



module.exports = webpackConfig // eslint-disable-line
