var path = require('path')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

var webpackConfig = {
  cache: true,
  map: true,
  entry: './app/index.js',
  output: {
    filename: 'index.js',
    path: 'dist',
    publicPath: '/',
    sourceMapFilename: '[file].map',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /icons/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          'image-webpack',
        ],
      },
      {
        test: /\.svg$/,
        include: /icons/,
        loader: 'svg-inline',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  plugins: [],

  resolveLoader: {
    modulesDirectories: [
      path.resolve('node_modules'),
    ],
  },

  resolve: {
    alias: {
      'utils': path.resolve('./app/utils'),
      'pages': path.resolve('./app/pages'),
      'assets': path.resolve('./app/assets'),
      'templates': path.resolve('./app/templates'),
      'app': path.resolve('./app'),
      'funx': path.resolve('./app'),
      'drivers': path.resolve('./app/drivers'),
    },
  },
  postcss: function () {
    return [require('postcss-cssnext')]
  },

  imageWebpackLoader: {
    pngquant:{
      quality: '65-90',
      speed: 4,
    },
    svgo: {
      plugins: [
        {removeViewBox: false},
        {removeEmptyAttrs: false},
      ],
    },
  },
}

module.exports = webpackConfig // eslint-disable-line
