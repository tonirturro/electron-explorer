'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const config = require('../config');
var webpackTest = require('../../webpack/base.frontend');
var webpackFrontEnd = require('../../webpack/dev.frontend');
webpackTest.output.filename = config.test.bundle;
webpackFrontEnd.output.filename = config.frontEnd.bundle;

gulp.task('build-frontend', () => {
  gulp.src(config.frontEnd.entry)
    .pipe(webpackStream(webpackFrontEnd), webpack)
    .pipe(gulp.dest(config.dest));
});

gulp.task('build-test', () => {
  gulp.src(config.test.entry)
    .pipe(webpackStream(webpackTest), webpack)
    .pipe(gulp.dest(config.test.dest));
});

