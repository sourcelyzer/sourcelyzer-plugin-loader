var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'plugin.js',
    pathinfo: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        { loader: 'babel-loader' },
        { loader: '../index.js', options: { modules: ['axios'] }}
      ]
    }]
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#eval-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

