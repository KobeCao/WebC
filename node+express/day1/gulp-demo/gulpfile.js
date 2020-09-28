// 引用gulp模块
const gulp = require('gulp'); 
// 引用gulp-htmlmin模块
const htmlmin = require('gulp-htmlmin');
// 引用gulp-file-include模块
const fileinclude = require('gulp-file-include');
// 引用gulp-less模块
const less = require('gulp-less');
// 引用gulp-csso模块
const csso = require('gulp-csso');
//引用gulp-babel模块
const babel = require('gulp-babel');
// 引用gulp-uglify模块
const uglify = require('gulp-uglify');

//使用gulp.task建立任务
// 1.任务的名称
// 2.任务的回调函数
gulp.task('first', (done) => {
	console.log('我们人生中的第一个gulp任务执行了');
	// 1.使用gulp.src获取要处理的文件
	gulp.src('./src/css/base.css')
        .pipe(gulp.dest('dist/css'));
        done(); // 如果任务是同步的，需要使用 done 回调。这样做是为了让 gulp 知道你的任务何时完成。
});

// html任务
// 1.html文件中代码的压缩操作 先抽取在压缩
// 2.抽取html文件中的公共代码
gulp.task('htmlmin',(done) => {
    gulp.src('./src/*.html')
    .pipe(fileinclude())
    // 压缩html文件中的代码 collapseWhitespace压缩空格的意思
    .pipe(htmlmin({ collapseWhitespace: true }))
    // 输出文件
    .pipe(gulp.dest('dist'));
    done();
});

// css任务
// 1. less语法转换
// 2. css代码压缩
gulp.task('cssmin',(done) => {
    // 同时选择了css目录下面的所有的less文件和css文件
    gulp.src(['./src/css/a.less','./src/css/*.css']) 
    // 将less语法转换为css语法
        .pipe(less())
        // 将css代码压缩
        .pipe(csso())
        // 将处理的结果输出文件
        .pipe(gulp.dest('dist/css'));
        done();
});

// js任务
// 1.es6代码转换
// 2.代码压缩
gulp.task('jsmin',(none) => {
    gulp.src('./src/js/*.js')
    //将ES6语法js文件转化成ES5语法
    .pipe(babel({
        // 它可以判断当前代码的运行环境 将代码转换为当前运行环境所支持的代码
        presets: ['@babel/env']
    }))
    // 将js代码压缩
    .pipe(uglify())
    // 将处理的结果输出文件
    .pipe(gulp.dest('dist/js'));
    none();
});

// 复制文件夹 将src里面的 image 和 lib 复制到 dist
gulp.task('copy',(none) => {
    gulp.src('./src/images/*')
    .pipe(gulp.dest('dist/images'));
    none();
    
    gulp.src('./src/lib/*')
    .pipe(gulp.dest('dist/lib'));
    none();
});

// 构建任务(当我执行当前任务的时候，其他的任务要依次执行)
gulp.task('my-tasks', gulp.series('htmlmin', 'cssmin', 'jsmin','copy', function(none) {
    none();
}));