var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('uglify', function(){
	return gulp.src(['src/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/minx'));
});

gulp.task('uglify-ext', function(){
	return gulp.src(['src/ext/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/minx/ext'));
});

gulp.task('concat', gulp.series('uglify', 'uglify-ext', function () {
	return gulp.src(['src/zn.js', 'src/*.js', 'src/ext/*.js'])
		.pipe(concat('zn.js'))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('concat-minx', gulp.series('uglify', 'uglify-ext', function () {
	return gulp.src(['dist/minx/zn.js', 'dist/minx/*.js',  'dist/minx/ext/*.js'])
		.pipe(concat('zn.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

//建立一个默认执行的任务，这个任务顺序执行上面创建的N个任务
gulp.task('default', gulp.series('concat', 'concat-minx'));