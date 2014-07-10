var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('minJS', function () {
    gulp.src('./js/LoaderImages.js')
        .pipe(rename('LoaderImages.min.js'))
		.pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('default', ['minJS']);