var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    notify = require("gulp-notify"),
    spritesmith = require('gulp.spritesmith'),
    gcmq = require('gulp-group-css-media-queries'),
    rsync = require('gulp-rsync');


/**
 * Сжать скрипты
 */
gulp.task('js', function () {
    return gulp.src([
        'app/js/common.js' // Всегда в конце
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Сделать спрайты
 */
gulp.task('sprite', function () {
    var spriteData = gulp.src('app/icons/*.png')
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: 'sprite.scss'
        }));
    return spriteData.pipe(gulp.dest('app/sprites/'));
});
/**
 * Запустить браузер.
 *
 * Указать путь до локального сервера
 */
gulp.task('browser-sync', function () {
    browserSync.init({ // Выполняем browserSync
        proxy: "test25.loc", // Прокси для Open Server
        notify: false // Отключаем уведомления
    });
});

/**
 * Перекодировать sass и сжать css
 */
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.+(sass|scss)')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gcmq())// Преобразуем медиа-запросы
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});


/**
 * Отслеживать изменения
 */
gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
    gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/*.php', browserSync.reload);
});

/**
 * Сжать картинки
 */
gulp.task('imagemin', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

/**
 * Скомпоновать проект
 */
gulp.task('build', ['removedist', 'sass', 'js'], function () {

    var buildFiles = gulp.src([
        'app/*.html',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildPHP = gulp.src([
        'app/*.php',
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildTxt = gulp.src([
        'app/*.txt',
    ]).pipe(gulp.dest('dist'));

    var buildImg = gulp.src([
        'app/img/**/*',
    ]).pipe(gulp.dest('dist/img'));

    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js',
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));


});


/**
 * Залить на сервер
 */
gulp.task('rsync', function () {
    return gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }));
});

/**
 * Удалить папку dist
 */
gulp.task('removedist', function () {
    return del.sync('dist');
});
/**
 * Очистить кеш
 */
gulp.task('clearcache', function () {
    return cache.clearAll();
});

/**
 * По умолчанию запустить отслеживание и браузер
 */
gulp.task('default', ['watch']);
