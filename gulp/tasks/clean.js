var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

gulp.task('clean', (done) => {
  return del([config.dest], done);
});
