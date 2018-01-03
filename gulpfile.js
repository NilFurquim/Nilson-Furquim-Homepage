const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const useref = require('gulp-useref');
const bower = require('gulp-bower');
const filter = require('gulp-filter');

const mainBowerFiles = require('main-bower-files');
const browserSync = require('browser-sync').create();

//gulp.task('bower:js', function() {
//	return gulp.src( mainBowerFiles({paths: './app'}), {base: "./app/bower_components"}).pipe(filter('**/*.js')).pipe(gulp.dest('app/js'));
//});
//
//gulp.task('bower:css', function() {
//	return gulp.src( mainBowerFiles({paths: './app'}), {base: "./app/bower_components"}).pipe(filter('**/*.css')).pipe(gulp.dest('app/css'));
//});

gulp.task('bower:lib', function() {
	gulp.src(mainBowerFiles({paths: './app'}))
		.pipe(gulp.dest('app/lib'));
	gulp.src('app/bower_components/material-design-icons/iconfont/*')
		.pipe(gulp.dest('app/lib/mdi'));
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'));
});

gulp.task('pug', function() {
	return gulp.src('app/templates/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('app'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	});
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['bower:lib','sass', 'pug', 'browserSync'], function() {
	gulp.watch('app/templates/**/*.pug', ['pug']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
