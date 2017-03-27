// Requirements
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var cache       = require('gulp-cached');
var changed     = require('gulp-changed');
var runSequence = require('run-sequence');

// Browser Sync Dev
gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    port: 8080,
    ghostMode: false,
    server: {
      baseDir: './',
      index: '/view/index.html'
    }
  });

  var reloadBrowser = function() {
    browserSync.reload();
  };

  gulp.watch(['./view/*.html']).on('change', reloadBrowser);
  gulp.watch(['./script/*.js']).on('change', reloadBrowser);
  gulp.watch(['./img/*']).on('change', reloadBrowser);
  gulp.watch(['./font/*']).on('change', reloadBrowser);
  gulp.watch(['./style/**/*.css'], ['css']);
});

// css
gulp.task('css', function() {
  return gulp.src('./style/**/*.css')
    .pipe(cache('cssCache'))
    .pipe(changed('./style/**/*.css'))
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(browserSync.stream());
});

// Serve Dev
gulp.task('serve', function(done) {
  runSequence('browserSync', function() {});
});