// 开发阶段需要的配置
// 进行合并
const webpackMerge = require('webpack-merge');
// 导入
const baseConfig = require('./base.config');

module.exports = webpackMerge(baseConfig,  {
  devServer: {
    contentBase: './dist',
  inline: true,
  }
})
