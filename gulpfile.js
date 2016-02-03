var gulp = require('gulp');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var requirejsOptimize = require('gulp-requirejs-optimize');
var minify = require('gulp-minify-css');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

gulp.task('build-css', ['compile-scss'], function() {
    gulp.src(['./app/css/**/*.css'])
        .pipe(concat('ui.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-core-min-js', function() {
    return gulp.src(['./app/js/core/main-core.js'])

        .pipe(requirejsOptimize({
            baseUrl: './app',
            name: 'js/core/main-core',
            mainConfigFile: 'app/js/core/main-core.js',
            optimize: 'uglify2',
            //optimize: 'none',
            throwWhen: {
                optimize: true
            },
            findNestedDependencies: true,
            paths: {
                requireLib: './js/core/libs/require-2.1.22',
                'requirejs-config': 'empty'
            },
            include: ['requireLib'],
            optimizeAllPluginResources: true,
            preserveLicenseComments: false
        }))
        .pipe(concat('core.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-ui-min-js', function() {
    return gulp.src(['./app/js/ui/main-ui.js'])

        .pipe(requirejsOptimize({
            baseUrl: './app',
            name: 'js/ui/main-ui',
            mainConfigFile: 'app/js/ui/main-ui.js',
            optimize: 'uglify2',
            //optimize: 'none',
            throwWhen: {
                optimize: true
            },
            findNestedDependencies: true,
            paths: {
                requireLib: './js/core/libs/require-2.1.22'
            },
            include: ['requireLib'],
            optimizeAllPluginResources: true,
            preserveLicenseComments: false
        }))
        .pipe(concat('ui.min.js'))
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