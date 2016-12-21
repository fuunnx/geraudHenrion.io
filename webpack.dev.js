var webpack = require('webpack')
var baseConfig = require('./webpack.common')
var merge = require('ramda').merge
var concat = require('ramda').concat


var webpackConfig = merge(baseConfig, {
  devtool: 'inline-source-map',

  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
    ]),
  },
  plugins: concat(baseConfig.plugins, [
    new webpack.NoErrorsPlugin(),
  ]),

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    contentBase: 'dist/',
    hot: true,
  },
})



module.exports = webpackConfig // eslint-disable-line
