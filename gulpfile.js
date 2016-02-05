var gulp = require('gulp');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var minify = require('gulp-minify-css');
var clean = require('gulp-clean');

/*task for local server*/
var connect = require('gulp-connect');

gulp.task('build', ['build:css', 'build:img', 'build:ui-min-js']);

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

gulp.task('runLocalServer', function() {
    connect.server({
        port: 6042,
        root: './'
    });
});

gulp.task('js-watch', function() {
    gulp.watch('app/js/**/*.js', ['build-ui-min-js']);
});

gulp.task('build:img', function() {
    return gulp.src(['./app/img/**'])
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('build:css', ['compile-scss'], function() {
    gulp.src(['./app/css/**/*.css'])
        .pipe(concat('ui.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build:core-min-js', function() {
    return gulp.src(['./app/js/core/main-core.js'])

        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build:ui-min-js', function() {
    return gulp.src(['./app/js/ui/main-ui.js'])

        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-scss', function() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/scss'
        }))
        .pipe(gulp.dest('./app/css'));
});