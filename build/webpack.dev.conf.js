const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ChromeReloadPlugin  = require('webpack-chrome-extension-reloader')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseConf = require('./webpack.base.conf')
const { resolve } = require('./util')

module.exports = merge(baseConf, {
  watch: true,
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new ChromeReloadPlugin({
      port: 2333,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
