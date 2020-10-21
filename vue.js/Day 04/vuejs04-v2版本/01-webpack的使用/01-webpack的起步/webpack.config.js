const path = require('path');
//配置文件就是一个js文件，通过Node中的模块操作，向外暴露一个配置对象。
module.exports = {
  entry: './src/main.js',//入口,要使用webpack打包那个文件。
  //输出文件的配置: 通常是一个对象，里面至少包含两个重要属性， path 和 filename 
	output: {
    path: path.resolve(__dirname, 'dist'), // path 通常是一个绝对路径
    //指定到那个目录中去
		filename: "bundle.js"//指定输出文件的名称
	}
}
