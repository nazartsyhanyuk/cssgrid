var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify");


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'docs'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src('docs/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('docs/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('docs/sass/**/*.sass', ['sass']);
	gulp.watch('docs/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
