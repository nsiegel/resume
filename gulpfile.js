var gulp = require('gulp');
var del = require('del');
var notify = require('gulp-notify');
var less = require('gulp-less');

var settings = {
  build_dir: './build/',
  less_dir: './less/',
  margin: '15',
};

gulp.task('clean', function() {
  return del([settings.build_dir]);
});

gulp.task('build', ['style'], function() {
  return gulp.src('')
    .pipe(notify('Resume Compiled'));
});

gulp.task('style', ['clean'], function() {
  return gulp.src(settings.less_dir + 'main.less')
    .pipe(less())
    .pipe(gulp.dest(settings.build_dir));
});

gulp.task('watch', function() {
  gulp.watch([
    settings.less_dir + '**/*.less'
  ], ['build']);
});
gulp.task('pdf', shell.task(
  [
    'wkhtmltopdf',
    '--margin-left ' + settings.margin,
    '--margin-right ' + settings.margin,
    '--zoom 1.0',
    '--viewport-size 1280x1024',
    settings.build_dir + 'resume_printable.html',
    'resume.pdf'
  ].join(' ')
));
