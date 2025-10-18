const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const del = require('del');

// Clean dist folder
gulp.task('clean', () => {
    return del(['dist']);
});

// Minify and combine JavaScript
gulp.task('js', () => {
    return gulp.src(['script.js', 'form-handler.js', 'gallery-config.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Minify CSS
gulp.task('css', () => {
    return gulp.src('styles.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'));
});

// Minify HTML
gulp.task('html', () => {
    return gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'));
});

// Copy assets
gulp.task('assets', () => {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

// Build task
gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'html', 'assets')));

// Default task
gulp.task('default', gulp.series('build'));