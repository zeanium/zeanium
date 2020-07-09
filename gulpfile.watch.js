var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch');

gulp.task('uglify-core', function(){
	return watch('src/core/*.js', function (){
		gulp.src(['src/core/*.js'])
			.pipe(uglify())
			.pipe(gulp.dest('dist/minx/core'));
	});
});

gulp.task('uglify-ext', function(){
	return watch('src/core/*.js', function (){
		gulp.src(['src/ext/*.js'])
			.pipe(uglify())
			.pipe(gulp.dest('dist/minx/ext'));
	});
});

gulp.task('concat-core', gulp.series('uglify-core', function () {
	return watch('src/core/*.js', function (){
		gulp.src(['src/core/zn.js', 'src/core/*.js'])
			.pipe(concat('zn.core.js'))
			.pipe(gulp.dest('dist/'));
	});
}));

gulp.task('concat-core-minx', gulp.series('uglify-core', function () {
	return watch('dist/minx/core/*.js', function (){
		gulp.src(['dist/minx/core/zn.js', 'dist/minx/core/*.js'])
			.pipe(concat('zn.core.minx.js'))
			.pipe(gulp.dest('dist/'));
	});
}));

gulp.task('concat-ext', gulp.series('uglify-ext', function () {
	return watch('src/ext/*.js', function (){
		gulp.src(['src/ext/*.js'])
			.pipe(concat('zn.ext.js'))
			.pipe(gulp.dest('dist/'));
	});
}));

gulp.task('concat-ext-minx', gulp.series('uglify-ext', function () {
	return watch('dist/minx/ext/*.js', function (){
		gulp.src(['dist/minx/ext/*.js'])
			.pipe(concat('zn.ext.minx.js'))
			.pipe(gulp.dest('dist/'));
	});
}));


gulp.task('concat', gulp.series('uglify-core', 'uglify-ext', function () {
	return watch('src/*.js', function (){
		gulp.src(['src/core/zn.js', 'src/core/*.js', 'src/ext/*.js'])
			.pipe(concat('zn.js'))
			.pipe(gulp.dest('dist/'));
	});
}));

gulp.task('concat-minx', gulp.series('uglify-core', 'uglify-ext', function () {
	return watch('dist/*.js', function (){
		gulp.src(['dist/minx/core/zn.js', 'dist/minx/core/*.js',  'dist/minx/ext/*.js'])
			.pipe(concat('zn.minx.js'))
			.pipe(gulp.dest('dist/'));
	});
}));

//建立一个默认执行的任务，这个任务顺序执行上面创建的N个任务
gulp.task('default', gulp.series('concat-core', 'concat-core-minx', 'concat-ext', 'concat-ext-minx', 'concat', 'concat-minx'));