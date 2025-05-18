const {src, dest, watch, parallel, series} = require('gulp');
const htmlMin = require('gulp-htmlmin');
const scss = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
// const uglify = require('gulp-uglify-es').default;
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');
const browserSync = require('browser-sync').create();
// Пути для удобного управления
const paths = {
  html: {
    src: 'source/pages/*.html',
    components: 'source/pages/components',
    dest: 'source'
  },
  styles: {
    src: 'source/scss/style.scss',
    dest: 'source/css/'
  },
  scripts: {
    src: 'source/js/script.js',
    modules: 'source/js/modules',
    dest: 'source/js/'
  },
  images: {
    src: 'source/img/origin/*.*',
    dest: 'source/img'
  },
  fonts: {
    src: 'source/fonts/origin/*.*',
    dest: 'source/fonts'
  },
  public: {
    src: [
      'source/*.html',
      'source/css/style.min.css',
      'source/css/style.css',
      'source/img/*.{jpg,png,avif,webp,svg}',
      'source/js/script.min.js',
      'source/fonts/*.*',
    ],
    dest: 'public'
  }
};

// Обработка HTML
const pagesHTML = () => {
  return src(paths.html.src)
    .pipe(include({
      includePaths: paths.html.components
    }))
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
};

// Минификация HTML
const htmlmin = () => {
  return src(paths.html.src)
    .pipe(htmlMin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(paths.public.dest))
    .pipe(browserSync.stream());
};

// Обработка стилей
const styles = () => {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss({
      outputStyle: 'expanded',
    }).on("error", scss.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(concat('style.css'))
    .pipe(dest(paths.styles.dest))
    .pipe(scss({
      outputStyle: 'compressed',
    }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
  };

// Scripts
const path = require('path');

function scripts() {
  // Формируем абсолютный путь к папке с модулями
  // const modulesPath = path.join(__dirname, 'source', 'js', 'modules');

  return src('source/js/script.js')
    .pipe(include({
      includePaths: ['source/js'], // Базовый путь для поиска
      extensions: 'js',
      hardFail: true
    }))
    .on('error', function(err) {
      console.error('Ошибка:', err.message);
      console.log('Проверьте наличие файлов в:', path.resolve('source/js/modules'));
      console.log('Ищем файлы в:', modulesPath);
      this.emit('end');
    })
    .pipe(concat('script.min.js'))
    .pipe(dest('source/js/'));
}

  // Обработка изображений
const images = () => {
  return src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(avif({quality: 60}))
    .pipe(src(paths.images.src))
    .pipe(newer(paths.images.dest))
    .pipe(webp())
    .pipe(src(paths.images.src))
    .pipe(newer(paths.images.dest))
    .pipe(imagemin())
    .pipe(dest(paths.images.dest));
};

// Обработка шрифтов
const fonts = () => {
  return src(paths.fonts.src)
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('source/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest(paths.fonts.dest));
};


// Удаление папки public (асинхронно)
const cleanPublic = async () => {
  const { deleteAsync } = await import('del');
  return deleteAsync('public');
};

// Копирование файлов в public
const copy = () => {
  return src(paths.public.src, {
    base: 'source'
  })
  .pipe(dest(paths.public.dest));
};

// Сервер и наблюдение
const watchingServer = () => {
  browserSync.init({
    server: {
      baseDir: 'source/'
    }
  });

  watch([paths.html.components + '/*', paths.html.src], pagesHTML);
  watch(['source/*.html']).on('change', browserSync.reload);
  watch(['source/scss/**/*.scss'], styles);
  watch([paths.images.src], images);
  watch(['source/js/**/*.js'], scripts); // Наблюдение за всеми JS-файлами
};

// Экспорты
exports.public = series(cleanPublic, copy, htmlmin);
exports.default = parallel(htmlmin, styles, images, scripts, pagesHTML, watchingServer);

// Экспорты для вызова отдельных функций

exports.pagesHTML = pagesHTML;
exports.htmlmin = htmlmin;
exports.styles = styles;
exports.images = images;
// exports.sprite = sprite;
exports.scripts = scripts;
exports.fonts = fonts;
exports.watchingServer = watchingServer;
exports.copy = copy;

console.log('Существующие файлы в js:', require('fs').readdirSync('source/js'));
console.log('Путь к модулям:', path.resolve('source/js/modules'));
// Выведет что-то вроде: C:\Projects\your-project\source\js\modules
