'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'); // Looks for javascript errors
var sass = require('gulp-sass'); // Converts SASS to CSS
var concat = require('gulp-concat'); // Merges multiple files into one
var uglify = require('gulp-uglify'); // Compresses javascript
var rename = require('gulp-rename'); // Renames destination files
var minifyCss = require('gulp-minify-css'); // Minifies CSS
var minifyHTML = require('gulp-html-minifier'); // Minifies HTML
var sourcemaps = require('gulp-sourcemaps'); // Maps compiled assets to source assets
var connect = require('gulp-connect'); // Creates web server

// Lint Task - checks for javascript and syntax errors
gulp.task('lint', function() {
  return gulp.src('src/javascripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('src/stylesheets/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('biola-styleguide.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe(rename('biola-styleguide.min.css'))
    .pipe(gulp.dest('dist/css'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('biola-styleguide.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('biola-styleguide.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('elements', function() {
  return gulp.src('src/elements/*.html')
    .pipe(minifyHTML({
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
      removeComments: true,
      removeCommentsFromCDATA: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('dist/elements'));
});

// Copy bower files to dist files into docs folder
gulp.task('docs', function() {
  gulp.src('dist/**/*').pipe(gulp.dest('docs/vendor/biola-styleguide'));
});

// Start server
gulp.task('server', function() {
  connect.server();
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/javascripts/*.js', ['lint', 'scripts', 'docs']);
  gulp.watch('src/stylesheets/*.scss', ['sass', 'docs']);
  gulp.watch('src/elements/*.html', ['elements', 'docs']);
});

// build task processes compresses and minifies all files into the dist folder
gulp.task('build', ['lint', 'sass', 'scripts', 'elements', 'docs']);

// develop task runs build then starts a server and watches for changes.
gulp.task('develop', ['build', 'server', 'watch']);

// Default Task
gulp.task('default', ['develop']);
