const {src, dest, watch, parallel, series} = require('gulp');

const htmlMin = require('gulp-htmlmin');
const scss = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat'); //объединение и переименовывание файлов
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer'); //Конвертированные (кэшированные) картинки повторно обрабатывать не будет
const svgSprite = require('gulp-svg-sprite');
const uglify = require('gulp-uglify-es').default;
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

// HTML склейка файлов

const pagesHTML = () => {
  return src('source/pages/*.html')
    .pipe(include({
      includePaths: 'source/pages/components'
    }))
    .pipe(dest('source'))
    .pipe(browserSync.stream());
};

//HTMLmin

const htmlmin = () => {
  return src('source/pages/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('public'))
    .pipe(browserSync.stream());
};

//Styles

const styles = () => {
  const newLocal = [
    'last 10 version',
  ];
  return src('source/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss({
      outputStyle: 'expanded',
    }).on("error", scss.logError))
    .pipe(postcss([
      autoprefixer(newLocal)
    ]))
    .pipe(concat('style.css'))
    .pipe(dest('source/css/'))
    .pipe(scss({
      outputStyle: 'compressed',
    }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest('source/css/'))
    .pipe(browserSync.stream());
};

// Images

const images = () => {
  return src(['source/img/origin/*.*', '!source/img/origin/*.svg'])
    .pipe(newer('source/img'))
    .pipe(avif({quality: 60}))

    .pipe(src('source/img/origin/*.*'))
    .pipe(newer('source/img'))
    .pipe(webp())

    .pipe(src('source/img/origin/*.*'))
    .pipe(newer('source/img'))
    .pipe(imagemin())

    .pipe(dest('source/img'))
};

// Svg Sprite

const sprite = () => {
  return src('source/img/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: true
        }
      }
    }))
    .pipe(dest('source/img'))
};


// Scripts

function scripts() {
  return src([
    'source/js/script.js'
  ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('source/js/'))
    .pipe(browserSync.stream());
}

// Fonts

const fonts = () => {
  return src('source/fonts/origin/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('source/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('source/fonts'))
};

// Watching and Server

const watchingServer = () => {
  browserSync.init({
    server: {
        baseDir: 'source/'
    }
  });
  watch(['source/components/*', 'source/pages/*'], pagesHTML),
  watch(['source/*.html']).on('change', browserSync.reload),
  watch(['source/scss/**/*.scss'], styles).on('change', browserSync.reload),
  watch(['source/img/origin'], images),
  watch(['source/js/script.js'], scripts)
};

//Clean

const cleanPublic = () => {
  return src('public')
    .pipe(clean())
};

// Copy

const copy = () => {
  return src([
    'source/*.html',
    'source/css/style.min.css',
    'source/img/*.{jpg,png,avif,webp}',
    'source/img/sprite.svg',
    'source/js/script.min.js',
    'source/fonts/*.*',
  ], {
    base: 'source'
  })
  .pipe(dest('public'));
};

// Экспорт файлов в папку public

exports.public = series(cleanPublic, copy, htmlmin);

// Экспорты для вызова отдельных функций

exports.pagesHTML = pagesHTML;
exports.htmlmin = htmlmin;
exports.styles = styles;
exports.images = images;
exports.sprite = sprite;
exports.scripts = scripts;
exports.fonts = fonts;
exports.watchingServer = watchingServer;
exports.copy = copy;



exports.default = parallel(htmlmin, styles, images, scripts, pagesHTML, watchingServer);
