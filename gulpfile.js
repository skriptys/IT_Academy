var gulp = require('gulp'),
  watch = require('gulp-watch'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-clean-css'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  include = require('gulp-file-include');


var path = {
  distr: {
    html: 'distr/',
    js: 'distr/js/',
    css: 'distr/css/',
    img: 'distr/img/',
    fonts: 'distr/fonts/'
  },
  src: {
    html: 'src/**/[^_]*.html',
    style: 'src/style/common-style.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    style: 'src/style/**/*.less',
    partials: 'src/partials/**/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './distr'
};

var config = {
  server: {
    baseDir: "./distr"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.distr.html))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(less())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.distr.css))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.distr.fonts))
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.distr.img))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
  watch([path.watch.html], function() {
    gulp.start('html:build');
  });
  watch([path.watch.style], function() {
    gulp.start('style:build');
  });
  watch([path.watch.img], function() {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function() {
    gulp.start('fonts:build');
  });
  watch([path.watch.partials], function() {
    gulp.start('style:build');
  });
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('build', [
  'html:build',
  'style:build',
  'fonts:build',
  'image:build'
]);

gulp.task('default', ['build','webserver', 'watch']);