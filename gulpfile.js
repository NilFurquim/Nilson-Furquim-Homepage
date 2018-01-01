const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const useref = require('gulp-useref');

const browserSync = require('browser-sync').create();

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

gulp.task('watch', ['sass', 'pug', 'browserSync'], function() {
	gulp.watch('app/templates/**/*.pug', ['pug']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
