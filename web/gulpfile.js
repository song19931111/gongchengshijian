var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify')
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
gulp.task('minifycss',function(done){
	gulp.src('./src/css/style.css')
	.pipe(minifyCss())
	.pipe(rename({extname:'.min.css'}))
	.pipe(gulp.dest('./dist/css/'))
	.on('end',done);
});
gulp.task('concatJS',function(done){
	gulp.src('./src/**/*.js')
	.pipe(concat('all.js'))
	.pipe(rename({extname:'.min.js'}))
	.pipe(gulp.dest('./dist/js/'))
	.on('end',done);
});