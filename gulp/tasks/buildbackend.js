'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const config = require('../config');
var webpackBackEnd = require('../../webpack/dev.backend');
webpackBackEnd.output.filename = config.backEnd.bundle;

gulp.task('build-backend', () => {
  gulp.src(config.backEnd.entry)
    .pipe(webpackStream(webpackBackEnd), webpack)
    .pipe(gulp.dest(config.dest));
});

