var argv = require('yargs').argv;

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');
var notify = require('gulp-notify');
var runSequence = require('run-sequence').use(gulp);


var settings = {
  build_dir: './build/',
  less_dir: './less/',
  margin: '15',
  theme: argv.theme || 'paper',
};

gulp.task('clean', function() {
  return del([settings.build_dir]);
});

gulp.task('build', ['style'], function() {
  return gulp.src('')
    .pipe(notify('Resume Compiled'));
});

gulp.task('style:web', function() {
  return gulp.src(settings.less_dir + 'main.less')
    .pipe(less({modifyVars: {'@theme': settings.theme}}))
    .pipe(gulp.dest(settings.build_dir));
});

gulp.task('style:pdf', function() {
  return gulp.src(settings.less_dir + 'pdf.less')
    .pipe(less({modifyVars: {'@theme': settings.theme}}))
    .pipe(gulp.dest(settings.build_dir));
});

gulp.task('style', function(callback) {
  return runSequence([
    'style:web',
    'style:pdf'
  ], callback);
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
