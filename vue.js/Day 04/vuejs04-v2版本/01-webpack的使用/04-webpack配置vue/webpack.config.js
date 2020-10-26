const path = require('path');
//配置文件就是一个js文件，通过Node中的模块操作，向外暴露一个配置对象。
module.exports = {
  entry: './src/main.js',//入口,要使用webpack打包那个文件。
  output: {//输出文件的配置
    path: path.resolve(__dirname, './dist'),//指定到那个目录中去
    filename: "bundle.js",//指定输出文件的名称
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader只负责将css文件进行加载
        // style-loader负责将样式添加到DOM中
        // 使用多个loader时候，是从右向左
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        },{
          loader: "less-loader"
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当加载的图片小于limit时,会将图片编译成base64字符串形式
              // 当加载的图片大于limit时，需要使用file-loader模块进行加载
              limit: 8196,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        // exclude: 排除
        // include: 包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }

    ]
  },
  resolve: {
    // alias： 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
