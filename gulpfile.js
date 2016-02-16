var argv = require('yargs').argv;

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');
var notify = require('gulp-notify');
var runSequence = require('run-sequence').use(gulp);
var nunjucksRender = require('gulp-nunjucks-render');


var settings = {
  build_dir: './build/',
  less_dir: './less/',
  html_dir: './html/',
  margin: '15',
  theme: argv.theme || 'paper',
};

var template = {
  name: 'Yasser Toruno',
  title: 'Software Engineer',
  email: 'ytoruno@gmail.com',
  linkedin: 'linkedin.com/in/yassertoruno',
  github: 'github.com/yassi',
  city: 'New York, New York,',
  website: 'yassi.io',
  google_analytics: 'UA-73825922-1'
}

gulp.task('clean', function() {
  return del([
    settings.build_dir,
    '*.pdf',
    '*.html'
  ]);
});


gulp.task('style', function(callback) {
  return gulp.src([settings.less_dir + 'main.less'])
    .pipe(less({modifyVars: {'@theme': settings.theme}}))
    .pipe(gulp.dest(settings.build_dir));
});

// Compile all html partials
gulp.task('html', ['style'], function() {
  return gulp.src(
    [
      settings.html_dir + 'index.html',
      settings.html_dir + 'index_pdf.html',
    ])
    .pipe(nunjucksRender({
      path: settings.html_dir,
      data: template
    }))
    .pipe(gulp.dest('./'))
});

// generate a pdf file from compiled html
gulp.task('pdf', shell.task(
  [
    'wkhtmltopdf',
    '--margin-left ' + settings.margin,
    '--margin-right ' + settings.margin,
    '--margin-top ' + '20',
    '--margin-bottom ' + settings.margin,
    '--zoom 1.0',
    '--viewport-size 1280x1024',
    'index_pdf.html',
    'yasser_toruno_resume.pdf'
  ].join(' ')
));

gulp.task('build', ['clean'], function(callback) {
  return runSequence(
    ['style', 'html'],
    'pdf',
    callback
  )
});

gulp.task('watch', function() {
  gulp.watch([
    settings.less_dir + '**/*.less',
    settings.html_dir + '**/*.html'
  ], ['build']);
});
