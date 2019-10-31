const gulp = require('gulp');
const sass = require('gulp-sass');
// const browserSync = require ('browser-sync').create();
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');

const config = require('./config.json');

function cssconcat() {
    return gulp.src('./css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'));
        // .pipe(browserSync.stream());
}

function jsconcat() {
    return gulp.src('./js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./'));
}

// compile scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./scss/**/*.scss')
    // 2. pass that fiel through sass compiler
        .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled CSS
        .pipe(gulp.dest('./css'))

    // is actually: return gulp.src('./scss/**/*.scss').pipe(sass()).pipe(gulp.dest('./css'))

    // 4. stream changes to all browser
    // .pipe(browserSync.stream())
}

function watch () {
    gulp.watch(['./scss/**/*.scss', './js/**/*.js'], gulp.series('style', 'csscon', 'jscon'));
    // gulp.watch('./js/**/*.js', 'jscon', gulp.parallel('jscon'));
}

function deploy() {
    const conn = ftp.create({
        host: config.host,
        user: config.user,
        password: config.password,
        parallel: 10,
        log: gutil.log
    });

    var globs = ['./style.css', './main.js'];

    return gulp.src( globs, {base: '.', buffer: false})
        .pipe( conn.newer('/domains/andrespinto.nl/public_html/wp-content/themes/divi-child'))
        .pipe( conn.dest('/domains/andrespinto.nl/public_html/wp-content/themes/divi-child'));
}

exports.style = style;
exports.watch = watch;
exports.csscon = cssconcat;
exports.deploy = deploy;
exports.jscon = jsconcat;