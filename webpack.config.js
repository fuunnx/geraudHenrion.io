var webpack = require('webpack')
var baseConfig = require('./webpack.common')
var merge = require('ramda').merge


var webpackConfig = merge(baseConfig, {
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ]),
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    contentBase: 'dist/',
  },
})



module.exports = webpackConfig // eslint-disable-line