const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.base.conf')
const config = require('../config')
const argv = require('yargs').argv;

base.entry = {
  lib: './src/index.js'
}

base.output = {
  path: config.bundle.assetsRoot,
  publicPath: config.bundle.assetsPublicPath,
  filename: 'vue-multiselect.min.js',
  library: 'VueMultiselect',
  libraryTarget: 'umd'
}

var webpackConfig = Object.assign({}, base)

webpackConfig.vue = {
  loaders: {
    css: ExtractTextPlugin.extract('css')
  }
}

webpackConfig.plugins = (webpackConfig.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new ExtractTextPlugin('vue-multiselect.css'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new CopyWebpackPlugin([
    { from: './src/' }
  ], {
    ignore: ['.DS_Store', 'index.js']
  })
])
module.exports = webpackConfig
