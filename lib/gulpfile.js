"use strict";

let gulp = require('gulp');
let jshint = require('gulp-jshint');
let watch = require('gulp-watch');
let sourcemaps = require('gulp-sourcemaps');
let gutil = require('gulp-util');

gulp.task('default', ['lint', 'watch']);

gulp.task('lint', function() {
  return gulp.src(['../app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function() {}
  );
});


gulp.task('watch', function() {
  gulp.watch(['../app/**/*.js'], ['lint']);

  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

