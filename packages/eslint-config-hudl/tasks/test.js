var path = require('path');
var fs = require('fs-extra');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var config = require('./config').test;

var testCoverageDir = './reports/coverage';

gulp.task('pre-test', function() {
  return gulp.src(config.src)
    // Covering files
    .pipe(istanbul({
      // Include files that don't have tests yet
      includeUntested: true,
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('run-test', ['pre-test'], function() {
  var stream = gulp.src(config.tests, {
    read: false,
  })
    .pipe(mocha({
      require: [config.setup],
      // Allow TeamCity to override with custom reporter
      reporter: process.env.MOCHAREPORTER || 'spec',
    }))
    // Creating the reports after tests run
    .pipe(istanbul.writeReports({
      dir: testCoverageDir,
      reporters: ['lcov', 'text'],
    }));

  if (config.coverageThresholds) {
    // Enforce a coverage of at least 90%
    stream = stream.pipe(istanbul.enforceThresholds({
      thresholds: config.coverageThresholds,
    }));
  }
  return stream;
});

gulp.task('test', ['run-test'], function() {
  // Copy test coverage HTML report to more generic name for TeamCity
  return new Promise(function(resolve) {
    fs.move(path.join(testCoverageDir, 'lcov-report/'), './reports/tabs/test-coverage', resolve);
  }).then(function() {
    fs.removeSync(testCoverageDir);
  });
});

// Task for running tests without code coverage; intended only for getting
// more accurate line numbers for debugging test errors
gulp.task('test-debug', function() {
  return gulp.src(config.tests, {
    read: false,
  })
    .pipe(mocha({
      require: [config.setup],
      // Allow TeamCity to override with custom reporter
      reporter: process.env.MOCHAREPORTER || 'spec',
    }));
});
