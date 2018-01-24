'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('watch-test-frontend', ['build-test'] ,() => {
  gulp.watch(config.frontEnd.scripts, ['build-test']);
});