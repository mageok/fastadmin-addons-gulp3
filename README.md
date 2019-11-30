# fastadmin-addons-gulp3
fastadmin 插件开发之 gulp3 实现自动刷新浏览器

针对 fastadmin 插件开发，以 CMS内容管理系统 为例

1.监测less文件变化，并自动编译成css文件

使用fastadmin cms 插件进行模板开发时，修改 less 文件后，需要将 less 编译成 css 文件，然后重新启用cms插件。使用gulp自并动编译 less，并刷新浏览器看效果。

2.修改插件文件后实时同步，自动刷新浏览器

通常修改了 application、assets 和 public 目录的文件后，需要在后台禁用在启用插件，使文件复制到thinkphp对应目录下，

才能使插件生效。使用gulp自动完成了这个工作，并刷新浏览器看效果。

3.监测其它文件修改，自动刷新浏览器

可以定义要监测的文件，比如controller目录下的文件，然后自动刷新浏览器。

## 构建步骤

### 安装 nodejs 和 全局安装 gulp-cli

下载 nodejs 并安装

https://nodejs.org/en/

全局安装 gulp-cli
```
npm install gulp-cli -g
```

### 克隆

fastadmin 根目录新建文件夹，比如 gulpdir，进入文件夹
```
git clone https://github.com/litemelon/fastadmin-addons-gulp3.git
```

### 安装依赖
```
npm install
```

### 修改设定

修改 gulpfile.js 里头部变量

```
// 这里改成你自己的设置
var rootDir = 'D:/xampp71/htdocs/demo.fastadmin.net/';
var baseDir = rootDir + 'addons/cms/';
var hostname = 'demo.fastadmin.net'; // 本地预览的域名, 本地解析dns或者填localhost
var startPath = 'index.php/cms';  // 默认打开的页面
var phpExePath = 'D:/xampp71/php/php.exe';
var phpIniPath = 'D:/xampp71/php/php.ini';
```

### 运行
```
gulp
```