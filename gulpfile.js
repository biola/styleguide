'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'); // Looks for javascript errors
var sass = require('gulp-sass'); // Converts SASS to CSS
var concat = require('gulp-concat'); // Merges multiple files into one
var uglify = require('gulp-uglify'); // Compresses javascript
var rename = require('gulp-rename'); // Renames destination files
var minifyCss = require('gulp-minify-css'); // Compresses CSS
var sourcemaps = require('gulp-sourcemaps'); // Maps compiled assets to source assets
var connect = require('gulp-connect'); // Creates web server
var bower = require('gulp-bower'); // Runs bower install

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

// Start server
gulp.task('server', function() {
  connect.server();
});

// Run bower install
gulp.task('bower', function() {
  return bower()
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/javascripts/*.js', ['lint', 'scripts']);
  gulp.watch('src/stylesheets/*.scss', ['sass']);
});

// build task processes compresses and minifies all files into the dist folder
gulp.task('build', ['lint', 'sass', 'scripts']);

// develop task runs build then starts a server and watches for changes.
gulp.task('develop', ['bower', 'build', 'server', 'watch']);

// Default Task
gulp.task('default', ['develop']);
