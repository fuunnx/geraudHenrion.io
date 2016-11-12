var path = require('path')

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

  resolveLoader: {
    modulesDirectories: [
      path.resolve('node_modules'),
    ],
  },

  resolve: {
    alias: {
      'utils': path.resolve('./utils'),
      'pages': path.resolve('./pages'),
      'assets': path.resolve('./assets'),
      'templates': path.resolve('./templates'),
      'app': path.resolve('./app'),
      'drivers': path.resolve('./drivers'),
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
