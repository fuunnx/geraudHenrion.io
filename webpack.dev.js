var webpack = require('webpack')
var baseConfig = require('./webpack.common')
var merge = require('ramda').merge



var webpackConfig = merge(baseConfig, {
  entry: [
    baseConfig.entry,
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/dev-server',
  ],
  devtool: 'inline-source-map',

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
    hot: true,
  },
})



module.exports = webpackConfig // eslint-disable-line
