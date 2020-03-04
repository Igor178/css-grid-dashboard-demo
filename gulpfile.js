const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')

gulp.task('browser-sync', done => {
  return browserSync.init({
    server: {
      baseDir: 'src'
    }
  })
})

const style = () => {
  // css plugins you want to use
  const plugins = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
    cssnano()
  ]

  return gulp
    .src('./src/scss/*.scss') // location of scss file
    .pipe(sass()) // sass compiler
    .on('error', sass.logError) // better error logs
    .pipe(postcss(plugins)) // plugins array pased to postcss
    .pipe(gulp.dest('./src/css'))
    .pipe(gulp.dest('./dist/css')) // location of compiled css file
    .pipe(browserSync.stream()) // stream changes to all browsers
}

const js = () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

const images = () => {
  return gulp
    .src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
}

const html = () => {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
}

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  })

  gulp.watch('./src/*.html', html)
  gulp.watch('./src/images/*', images)
  gulp.watch('./src/js/*.js', js)
  gulp.watch('./src/scss/*.scss', style)
  gulp.watch('./src/*.html').on('change', browserSync.reload)
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload)
}

exports.html = html
exports.images = images
exports.js = js
exports.style = style
exports.watch = watch

const build = gulp.parallel(html, images, js, style)
gulp.task('default', build)
