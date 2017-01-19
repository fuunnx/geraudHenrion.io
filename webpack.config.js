const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (env) { // eslint-disable-line
  const isProd = env === 'production'
  const isStatic = env === 'static'
  const isDev = env === 'development'
  const sourcePath = path.resolve('./app')
  const staticsPath = path.resolve('./dist')
  const tempPath = path.resolve('./.scripts/temp')

  const cssLoaders = [
    'style-loader',
    {
      loader: 'css-loader',
      query: {
        sourceMap: true,
        modules: true,
        localIdentName: isDev
          ? '[name]__[local]___[hash:base64:5]'
          : '[hash:base64:5]',
      },
    },
    'postcss-loader',
  ]

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        RUN_CONTEXT: JSON.stringify(isStatic ? 'node' : 'browser'),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    )
  }
  // if (isDev) {
  //   plugins.push(
  //     // new webpack.HotModuleReplacementPlugin()
  //   )
  // }
  if (isStatic) {
    plugins.push(
      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: false,
        allChunks: true,
      })
    )
  }
  if (!isStatic) {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        names: ['common', 'vendor'],
        minChunks: Infinity,
      })
    )
  }

  return {
    target: isStatic ? 'node' : 'web',
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: isStatic
      ? 'index.' + env + '.js'
      : {
        js: 'index.' + env + '.js',
        vendor: ['normalize.css', '@cycle/dom', '@cycle/history', '@cycle/xstream-run', 'history'],
      },
    output: {
      path: isStatic ? tempPath : staticsPath,
      publicPath: '/',
      filename: isStatic ? 'index.js' : '[name].bundle.js',
      sourceMapFilename: '[file].map',
      libraryTarget: isStatic ? 'umd' : undefined,
    },
    // node: {
    //   '__dirname': '/',
    //   '../package.json': 'empty',
    // },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          loader: isStatic
            ? ExtractTextPlugin.extract({
              fallbackLoader: cssLoaders.shift(),
              loader: cssLoaders,
            })
            : cssLoaders,
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          exclude: /icons/,
          use: [
            'file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
            'image-webpack-loader',
          ],
        },
        {
          test: /.*\.(pdf)$/i,
          use: [
            'file-loader?name=[name].[ext]',
          ],
        },
        {
          test: /\.svg$/,
          include: /icons/,
          use: ['svg-inline-loader'],
        },
        {
          test: /\.json$/,
          use: ['json-loader'],
        },
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
        'sitemap': path.resolve('./.scripts/temp/sitemap.js'),
      },
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
      modules: [
        path.resolve('./node_modules'),
        sourcePath,
      ],
    },
    plugins,
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      port: 3000,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        },
      },
    },
  }
}
