const path = require('path');
//配置文件就是一个js文件，通过Node中的模块操作，向外暴露一个配置对象。
module.exports = {
	entry: path.join(__dirname, './src/main.js'),//入口,要使用webpack打包那个文件。
	output: {//输出文件的配置
		path: path.join(__dirname, './dist'),//指定到那个目录中去
		filename: "bundle.js"//指定输出文件的名称
	}
}
