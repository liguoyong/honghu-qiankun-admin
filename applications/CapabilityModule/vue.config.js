const path = require('path')
const { name } = require('./package');

module.exports = {
  outputDir: 'dist', // 打包dist所在路径
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ['simple-mind-map'],
  devServer: {
    hot: true,
    disableHostCheck: true,
    port: 2001,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  }
}
