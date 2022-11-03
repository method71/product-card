const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const gcssmq = require('gulp-group-css-media-queries');
const includeFiles = require('gulp-include');
const browserSync = require('browser-sync').create();

function browsersync() {
    browserSync.init({
      server: {
        baseDir: './dist/',
        serveStaticOptions: {
          extensions: ['html'],
        },
      },
      port: 8080,
      ui: { port: 8081 },
      open: true,
    })
}

function styles() {
    return src('./src/assets/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions'],
      browsers: [
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 11',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6',
      ],
    }))
    .pipe(gcssmq())
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src('./src/assets/js/main.js')
    .pipe(
        includeFiles({
          includePaths: './src/assets/js/**/',
        })
      )
    .pipe(dest('./dist/js/'))
    .pipe(browserSync.stream())
}

function pages() {
    return src('./src/*.html')
    .pipe(
      includeFiles({
        includePaths: './src/components/*.html',
      })
    )
    .pipe(dest('./dist/'))
    .pipe(browserSync.reload({ stream: true, }))
}

function copyFonts() {
    return src('./src/assets/fonts/**/*')
    .pipe(dest('./dist/fonts/'))
}
  
function copyImages() {
    return src('./src/assets/img/**/*')
    .pipe(dest('./dist/img/'))
}
  
async function copyResources() {
    copyFonts()
    copyImages()
}

async function clean() {
    return del.sync('./dist/', { force: true })
}

function watch_dev() {
    watch(['./src/assets/js/*.js'], scripts).on(
        'change',
        browserSync.reload
    )
    watch(['./src/assets/css/*.scss'], styles).on(
      'change',
      browserSync.reload
    )
    watch(['./src/*.html', './src/components/*.html'], pages).on(
      'change',
      browserSync.reload
    )
}

exports.browsersync = browsersync
exports.clean = clean
exports.scripts = scripts
exports.styles = styles
exports.pages = pages
exports.copyResources = copyResources

exports.default = parallel(
  clean,
  styles,
  scripts,
  copyResources,
  pages,
  browsersync,
  watch_dev
)

exports.build = series(
  clean,
  styles,
  scripts,
  copyResources,
  pages
)