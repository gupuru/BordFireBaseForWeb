var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {
    browserify('./scripts/app.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('./scripts/build.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
  var jsxpath = "./scripts/*.jsx"
  var htmlpath = "./*.html"
  gulp.watch(jsxpath, ['browserify'])
  gulp.watch(htmlpath)
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
