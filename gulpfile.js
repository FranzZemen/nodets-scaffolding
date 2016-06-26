var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var copy = require('gulp-copy');
var debug = require('gulp-debug');
var mocha = require('gulp-mocha');

gulp.task('clean', function() {
    del([
      './server'
    ])
});

gulp.task('scripts', function () {
  return gulp.src([
    'typings/**/*.ts',
    'app/**/*.ts', 'config/**/*.ts'])
//    .pipe(debug({title: 'scripts src'}))
    .pipe(sourcemaps.init())
    .pipe(ts({
      'target': 'es5',
      'module': 'commonjs',
      'moduleResolution': 'node',
      'sourceMap': true,
      'emitDecoratorMetadata': true,
      'experimentalDecorators': true,
      'removeComments': false,
      'noImplicitAny': false,
      'rootDir' : './',
      'outDir' : './server'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./server'))
});


gulp.task('copy', function () {
  return gulp.src(
    [
      'app/**/*.js',
      'app/**/*.json'
    ])
    //    .pipe(debug({title:'Copy'}))
    .pipe(copy('./server'));
});

gulp.task('test', ['scripts','copy'], function() {
  return gulp.src('server/**/*.spec.js', {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'spec'}));
});


gulp.task('default', [
  'scripts',
  'copy'
]);
