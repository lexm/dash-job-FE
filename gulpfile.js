'use strict';
const gulp = require('gulp');
const webpack = require('webpack-stream');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const wp = require('webpack');

var settings = {
  productionApiUri: 'https://powerful-hollows-96528.herokuapp.com/',
  localApiUri: 'http://localhost:3000/'
};

var paths = {
  dev: {
    css: 'app/css/**/*.css',
    html: 'app/**/*.html',
    js: 'app/js/**/*.js',
    test: 'test/*_test.js'
  },
  build: {
    main: 'build/',
    css: 'build/css',
    js: 'build/js',
    test: 'test/'
  },
  production: {
    main: 'public/',
    css: 'build/css',
    js: 'build/js'
  }
};

gulp.task('watch', function () {
  gulp.watch(paths.dev.html, ['statichtmlfiles:dev']);
  gulp.watch(paths.dev.js, ['bundle']);
  gulp.watch(paths.dev.css, ['staticcssfiles:dev']);
  gulp.watch(paths.dev.test, ['bundle:test']);
});

gulp.task('statichtmlfiles:dev', () => {
  return gulp.src(paths.dev.html)
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('staticcssfiles:dev', () => {
  return gulp.src(paths.dev.css)
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('statichtmlfiles:production', () => {
  return gulp.src(paths.dev.html)
    .pipe(gulp.dest(paths.production.main));
});

gulp.task('staticcssfiles:production', () => {
  return gulp.src(paths.dev.css)
    .pipe(gulp.dest(paths.production.main));
});


gulp.task('bundle', () => {
  var webpackplugin = new wp.DefinePlugin({'process.env':{URI: JSON.stringify(settings.localApiUri)}});
  return gulp.src(__dirname + '/app/js/client.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackplugin]
    }))
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('bundle:production', () => {
  var webpackplugin = new wp.DefinePlugin({'process.env':{URI: JSON.stringify(settings.productionApiUri)}});
  return gulp.src(__dirname + '/app/js/client.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackplugin]
    }))
    .pipe(gulp.dest(paths.production.main));
});



gulp.task('bundle:test', () => {
  var webpackplugin = new wp.DefinePlugin({'process.env':{URI: JSON.stringify(settings.localApiUri)}});
  return gulp.src(paths.dev.test)
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      },
      plugins: [webpackplugin],
      module:{
        loaders:[{
          test:/\.html$/,
          loader:'html'
        }]
      }
    }))
    .pipe(gulp.dest(paths.build.test));
});

gulp.task('default', ['bundle', 'statichtmlfiles:dev', 'staticcssfiles:dev']);
gulp.task('build:production', ['bundle:production', 'statichtmlfiles:production', 'staticcssfiles:production']);
