const { resolve } = require('./util')

module.exports = {
  name: 'chrome-ext',
  outputPath: resolve('output'),
  keyPath: resolve('key.pem'),
  contentPath: resolve('dist')
}
