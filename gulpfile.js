/**
 * Created by Qiaodan on 2017/3/28.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),//less解码
    autoprefixer = require('gulp-autoprefixer'),//css兼容性
    minifyCss = require("gulp-minify-css"),//css文件压缩
    concat = require("gulp-concat"),//文件合并
    livereload = require('gulp-livereload'),//动态刷新
    cheerio = require('gulp-cheerio'),//批量更换html中的引用
    ejs  = require('gulp-ejs'),//ejs模板
    rename = require("gulp-rename");//重命名


gulp.task('fileIncludeDev', function () {
    gulp.src('src/view/**/*.ejs')
        //拼接html
        .pipe(ejs())
        //注入css文件
        .pipe(cheerio(function ($) {
            var addHtml = "<link rel='stylesheet'  href='css/homepage_new2017.css'/>\n";
                addHtml+="<link rel='stylesheet'  href='css/swiper.min.css'/>\n";
            $('head').append(addHtml);
        }))
        .pipe(cheerio(function ($) {
            var addJs ="<script src='js/jquery-3.0.0.min.js'></script>\n";
            addJs += "<script src='js/homepage_new2017.js'></script>\n";
            addJs+="<script src='js/swiper.min.js'></script>\n";
            addJs+="<script src='js/homepage_dev.js'></script>\n";
            $('body').append(addJs);
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest('build'));
    
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'))
});


//更新和css文件所有less文件去开发环境
gulp.task('changeLessDev',changeLessDevFn );

function changeLessDevFn() {
    gulp.src(['src/component/**/**/*.less']) //该任务针对的文件7
        .pipe(less()) //编译less
        .pipe(autoprefixer({
            browsers: ['Android >= 4.0', 'IOS >=7','Firefox >= 20' , 'ie >= 8'],//兼容设备
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat('homepage_new2017.css'))  // 合并匹配到的css文件并命名为 "all.js"
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('build/css')) //将会在src/css下生成index.css
        .pipe(livereload());

   // gulp.src(['src/css/mine.css']) //该任务针对的文件7
       // .pipe(concat('mine.css'))  // 合并匹配到的css文件并命名为 "all.js"
       // .pipe(gulp.dest('build/css')); //将会在src/css下生成index.css

}

/*k开发环境监听*/
gulp.task('devWatch', function () {

    //less文件修改 ，注入css
    gulp.watch('src/component/**/**/*.less', ['changeLessDev']);

    livereload.listen(); //要在这里调用listen()方法

    //html文件修改，注入html
    var htmlWatcher=gulp.watch('src/**/**/*.ejs' ,["fileIncludeDev"]);

    htmlWatcher.on('change',function (file) {

        setTimeout(function () {

            livereload.changed(file.path);

        },100);

    })

});