var path = require('path')

var webpackConfig = {
  devtool: 'source-map',
  watch: false,
  cache: true,
  entry: './app/index.js',
  map: true,

  output: {
    filename: 'app.js',
    path: path.resolve('./dist/'),
    sourceMapFilename: '[file].map',
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
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
    ],
  },

  resolveLoader: {
    modulesDirectories: [
      path.resolve('./node_modules'),
    ],
  },

  resolve: {
    alias: {
      'utils': path.resolve('./utils'),
      'components': path.resolve('./src/components'),
      'pages': path.resolve('./pages'),
      'app': path.resolve('./app'),
      'drivers': path.resolve('./drivers'),
      'icons': path.resolve('./src/icons'),
      'assets': path.resolve('./assets'),
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
    svgo:{
      plugins: [
        {removeViewBox: false},
        {removeEmptyAttrs: false},
      ],
    },
  },
}

module.exports = webpackConfig
