'use strict';

// Подключение плагинов через переменные:
var gulp = require('gulp'), // Gulp
    debug = require('gulp-debug'), // Отслеживание тасков в терминале
    del = require('del'), // Удаление папок и файлов
    inlineCss = require('gulp-inline-css'), // Создание инлайн-стилей
    notify = require("gulp-notify"), // Вывод надписей при ошибках
    plumber = require('gulp-plumber'), // Обработка ошибок
    pug = require('gulp-pug'), // Pug
    sass = require('gulp-sass'); // Sass

// Задание путей к используемым файлам и папкам:
var paths = {
  dir: {
    app: './app',
    dist: './dist'
  },
  watch: {
    html: './app/pug/**/*.pug',
    css: ['./app/sass/**/*.scss']
  },
  app: {
    html: {
      src: './app/pug/email.pug',
      dest: './app'
    },
    css: {
      src: [
        './app/sass/styles/inline.scss',
        './app/sass/styles/media.scss'
      ],
      dest: './app/css'
    }
  },
  dist: {
    src: './app/email.html',
    dest: './dist'
  }
}

// Подключение Browsersync:
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

// Таск для работы Browsersync (автообновление браузера):
gulp.task('serve', function() {
  browserSync.init({
    server: { // Настройки сервера
      baseDir: paths.dir.app, // Базовая директория
      index: 'email.html' // Индексный файл
    }
  });
  gulp.watch([paths.watch.html, paths.watch.css], gulp.series('build')); // Отслеживание изменений Pug и Sass-файлов
  gulp.watch('*.html').on('change', reload); // Обновление браузера в случае изменения индексного файла email.html в development-папке app
});

// Таск для работы Pug (преобразование Pug в HTML):
gulp.task('html', function() {
  return gulp.src(paths.app.html.src) // Исходник таска html
    .pipe(plumber()) // Обработка ошибок таска html
    .pipe(debug({title: 'Pug source'})) // Отслеживание исходника таска html
    .pipe(pug({
      pretty: true, // Форматирование разметки в HTML-файле
      doctype: 'HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"' // Установка doctype
    }))
    .pipe(debug({title: 'Pug'})) // Отслеживание работы плагина Pug
    .pipe(gulp.dest(paths.app.html.dest)) // Сохранение HTML-шаблона письма в папке app
    .pipe(debug({title: 'Pug dest'})) // Отслеживание сохранения HTML-шаблона
    .pipe(browserSync.stream()); // Browsersync
});

// Таск для работы Sass (преобразование Sass в CSS):
gulp.task('css', function() { // Исходник таска css
  return gulp.src(paths.app.css.src)
    .pipe(plumber()) // Обработка ошибок таска css
    .pipe(debug({title: 'Sass source'})) // Отслеживание исходника таска css
    .pipe(sass()) // Преобразование Sass в CSS
    .pipe(debug({title: 'Sass'})) // Отслеживание работы плагина Sass
    .pipe(gulp.dest(paths.app.css.dest)) // Сохранение CSS-файла
    .pipe(debug({title: 'Sass dest'})) // Отслеживание сохранения
    .pipe(browserSync.stream()); // Browsersync
});

// Таск для предварительной очистки (удаления) production-папки:
gulp.task('clean', function() {
  return del(paths.dir.dist);
});

// Таск для формирования инлайн-стилей из внешнего файла inline.css:
gulp.task('inline', function() {
  return gulp.src(paths.dist.src) // Исходник для таска inline
    .pipe(debug({title: 'Inline CSS sourse'})) // Отслеживание исходника таска inline
    .pipe(inlineCss({ // Преобразование стилей из внешнего файла inline.css в инлайн-стили
        preserveMediaQueries: true, // Сохранение медиа-запросов в тегах style HTML-шаблона
        applyTableAttributes: true // Преобразование табличных стилей в атрибуты
    }))
    .pipe(debug({title: 'Inline CSS'})) // Отслеживание преобразования
    .pipe(gulp.dest(paths.dist.dest)) // Сохранение результатов в production-папку dist
    .pipe(debug({title: 'Inline CSS dest'})); // Отслеживание сохранения
});

// Таск сборки:
gulp.task('build', gulp.series('html', 'css', 'clean', 'inline'));

// Таск для запуска разработки:
gulp.task('default', gulp.series('build', 'serve'));
