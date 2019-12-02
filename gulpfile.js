var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var connectPhp = require('gulp-connect-php');
var run = require('gulp-run');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

// 这里改成你自己的设置
var rootDir = 'D:/xampp71/htdocs/demo.fastadmin.net/';
var baseDir = rootDir + 'addons/cms/';
var hostname = 'demo.fastadmin.net'; // 本地预览的域名, 本地解析dns或者填localhost
var startPath = 'index.php/cms';  // 默认打开的页面
var phpExePath = 'D:/xampp71/php/php.exe';
var phpIniPath = 'D:/xampp71/php/php.ini';

gulp.task('less',function(){
  return gulp.src(baseDir + 'assets/less/*.less')
          .pipe(sourcemaps.init())
          .pipe(less())
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(baseDir + 'assets/css/'))
          .pipe(browserSync.reload({stream:true}))  // 为刷新建立一个管道
});

// 启用cms插件
gulp.task('enable',function() {
  return run('cd ' + rootDir + ' && ' + phpExePath + ' think addon -a cms -c enable --force=true').exec()    // 执行enable 插件
    .pipe(gulp.dest('output'))      // 如果执行错误，输出，方便调试
  ;
});

// 监测文件变化, 编译less,js 等addons/cms文件夹内要做的事情
gulp.task('watch',function(){
  // 仅编译less, 不刷新浏览器, 待less编译完成后, 监测css变化刷新浏览器
  w(baseDir + 'assets/less/*.less','less');
  // view模板的变化不需要enable, 直接刷新浏览器
  w(baseDir + 'view/**/*.*','browser-reload');
  // 监测文件变化, 先enable插件, 完成后再刷新浏览器, 同步执行
  w_reload(baseDir + 'application/**/*.php','enable');
  w_reload(baseDir + 'assets/**/*.*','enable');
  w_reload(baseDir + 'public/**/*.*','enable');

  // 监测文件变化, 执行单次任务
  function w(path,task) {
    watch(path,function(){
      gulp.start(task);
    });
  }
  // 定义一个函数, 按顺序先enable插件, 再刷新浏览器, 同步执行
  function w_reload(path,task) {
    watch(path,function(){
      runSequence(task,'browser-reload',function(){});
    });
  }
});

// 微型服务器, 能够访问php
gulp.task('server',function(){
  var options = {
    base: rootDir + 'public',       // 访问的根目录
    open: false,                     // 自动打开浏览器
    bin: phpExePath,  // 本地php.exe路径
    ini: phpIniPath,  // 本地php.ini路径
    port: 3500,                     // server端口
  };
  connectPhp.server(options);
});

/**
 * 多浏览器同步刷新
 * 依赖enable任务的完成
 */
gulp.task('browser-sync',function(){
  var options = {
    proxy: '127.0.0.1:3500',  // 或者填
    host: hostname,
    port: 3600,
    watch: true,
    startPath: startPath,
    open: 'external',
  };
  browserSync.init(options);
});

// 刷新浏览器任务
gulp.task('browser-reload',function(){
  browserSync.reload();
});

// 默认任务
gulp.task('default',function(cb){
  runSequence(
    ['less'],
    ['enable'],
    ['server','browser-sync','watch'],
    cb
  );
});

