var argv = require('yargs').argv;

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');
var notify = require('gulp-notify');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence').use(gulp);
var nunjucksRender = require('gulp-nunjucks-render');


var settings = {
  build_dir: './build/',
  publish_dir: './.publish/',
  less_dir: './less/',
  html_dir: './html/',
  margin: '15',
  pdf_file_name: 'nicole_siegel_resume.pdf',
  theme: argv.theme || 'lumen',
  pdf_override: true,
};

var template = {
  name: 'Nicole Siegel',
  title: 'Software Engineer',
  email: 'nsiegel2@gmail.com',
  linkedin: 'linkedin.com/in/nssiegel',
  github: 'github.com/nsiegel',
  twitter: '',
  city: 'New York, New York',
  city_short: 'NYC',
  website: 'nicolesiegel.me',
  google_analytics: '',
  gravatar: 's.gravatar.com/avatar/65b71e80648b928d4246ac9f30fb569e?s=30',
  url: 'resume.nicolesiegel.me',
  description: 'Nicole Siegel is a software engineer based in NYC.',
  keywords: 'software, development, code, startups, resume, programming, javascript',
  pdf_override: settings.pdf_override,
  pdf_file_name: settings.pdf_file_name
};

gulp.task('clean', function() {
  return del([
    settings.build_dir,
    settings.publish_dir,
    '*.pdf',
    '*.html'
  ]);
});


gulp.task('style', function(callback) {
  var less_vars = {
    '@theme': settings.theme,
  };
  return gulp.src([settings.less_dir + 'main.less'])
    .pipe(less({modifyVars: less_vars}))
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
    .pipe(gulp.dest(settings.build_dir))
});

// generate a pdf file from compiled html
gulp.task('pdf', shell.task(
  [
    'wkhtmltopdf',
    '--margin-left ' + settings.margin,
    '--margin-right ' + settings.margin,
    '--margin-top ' + settings.margin,
    '--margin-bottom ' + settings.margin,
    '--zoom 1.0',
    '--viewport-size 1280x1024',
    settings.build_dir + 'index_pdf.html',
    settings.build_dir + settings.pdf_file_name
  ].join(' ')
));

gulp.task('build', ['clean'], function(callback) {
  return runSequence(
    ['style', 'html'],
    'pdf',
    callback
  )
});

gulp.task('deploy', ['build'], function() {
  return gulp.src([
    './CNAME',
    settings.build_dir + '**/*'
    ])
    .pipe(ghPages({
      force: true, // NOTE: Turn off force pushing on master through github
      push: true,
      branch: 'gh-pages'
    }))
    .pipe(notify('Resume deployed'));
});

gulp.task('watch', function() {
  gulp.watch([
    settings.less_dir + '**/*.less',
    settings.html_dir + '**/*.html'
  ], ['build']);
});
