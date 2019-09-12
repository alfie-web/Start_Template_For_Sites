var gulp             = require('gulp'),
     sass            = require('gulp-sass'),
     browserSync = require('browser-sync'),
     concat         = require('gulp-concat'),
     uglify            = require('gulp-uglifyjs'),
     rename         = require('gulp-rename'),
     del               = require('del'),
     autoprefixer    = require('gulp-autoprefixer');

gulp.task('sass', function() {    //Создаём task sass для компиляции sass кода в css код в файл main.css
	return gulp.src('app/sass/**/*.sass')  //'app/sass/main.sass' - выбор конкретного файла, 'app/sass/*.sass' - выборка всех файлов sass в директории, 'app/sass/**/*.sass' - выборка всех файлов sass в в директории и во всех поддиректориях
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery-v1.10.2.min.js',
		'app/libs/slick/slick.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		//browser: 'chrome',   // Если он по умолчанию
		notify: false
	});
});


gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {  //Отслеживаем изменения во всех файлах sass и запускаем task sass
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);