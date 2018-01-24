'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const config = require('../config');
var webpackBackEnd = require('../../webpack/dev.frontend');
webpackBackEnd.output.filename = config.backendEnd.bundle;

gulp.task('build-backend', () => {
  gulp.src(config.backendEnd.entry)
    .pipe(webpackStream(webpackBackEnd), webpack)
    .pipe(gulp.dest(config.dest));
});

