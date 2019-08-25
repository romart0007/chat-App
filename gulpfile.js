var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('css', function() {
    return gulp.src('client/css/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('client/css/bundle'))
});


gulp.task('nodemon', function() {
    nodemon({
            script: 'server.js',
            ext: 'js',
            ignore: ['/']
        })
        .on('‘restart', function() {
            console.log('>> node restart');
        })
});


gulp.task('watch', ['css'], function() {
    gulp.watch('client/css/scss/**/*.scss', ['css']);
});

gulp.task('build', ['watch', 'nodemon']);