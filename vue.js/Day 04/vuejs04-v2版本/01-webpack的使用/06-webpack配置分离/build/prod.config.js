// 生产时需要的配置
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
// 进行合并
const webpackMerge = require('webpack-merge');
// 导入
const baseConfig = require('./base.config');

// 相当于webpackMerge把 baseConfig 和 {plugins: [new UglifyjsWebpackPlugin()]} 进行合并，并且将结果导出。
module.exports = webpackMerge(baseConfig, {
  plugins: [
    new UglifyjsWebpackPlugin()
  ]
})

