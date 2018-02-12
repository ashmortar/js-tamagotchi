var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var concat = require('gulp-concat');
var moment = require('moment');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var buildProduction = utilities.env.production

//test task
gulp.task('thingy', function() {
  console.log('gulp task functions');
})

//real tasks


//run automated lining
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//concatenate interfaces
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});


//make all js files into app.js
gulp.task('jsBrowserify', ['concatInterface', 'cssBuild'], function() {
  return browserify({ entries: ['./tmp/allConcat.js']})
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'))
});


//make all js files into minified app.js
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

//delete previous build and tmp folders
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

gulp.task('jsBuild', ['jsBrowserify', 'jshint', 'cssBuild'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['css/*.css'], ['jsBuild']);
});

gulp.task('cssBuild', function() {
  return gulp.src('./css/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build/css'));
});

//make all js devDependencies one file
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

//make all css Dependencies one file
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//make all js and css Dependencies into respective single file
gulp.task('bower', ['bowerJS', 'bowerCSS']);

//clean previous files and make new build either production or development based on var
gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});
