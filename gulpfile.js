var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('uglify', function(){
	return gulp.src(['src/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/minx'));
});

gulp.task('concat', gulp.series('uglify', function () {
	return gulp.src(['src/zn.js', 'src/builtin.js', 'src/fix.js', 'src/class.js'])
		.pipe(concat('zn.js'))
		.pipe(gulp.dest('dist/'));
}));

gulp.task('concat-minx', gulp.series('uglify', function () {
	return gulp.src(['dist/minx/zn.js', 'dist/minx/builtin.js', 'dist/minx/fix.js', 'dist/minx/class.js'])
		.pipe(concat('zn.minx.js'))
		.pipe(gulp.dest('dist/'));
}));

//建立一个默认执行的任务，这个任务顺序执行上面创建的N个任务
gulp.task('default', gulp.series('concat', 'concat-minx'));