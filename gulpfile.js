'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create({
    path: 'app'
});

gulp.task('debug-electron', () => {
    electron.start('--remote-debugging-port=9222');
});