var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
 
gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'))
        .pipe(reload({stream: true}));
        console.log('Updated!',new Date().toTimeString(), (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
    gulp.watch('styles/**/*.css', function () {
        return gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(reload({stream: true}));
    });
});

gulp.task('default', ['browserify', 'css']);

gulp.task('serve', ['default'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: "./"
        }
    });

    gulp.src('styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./assets/css/'));

    gulp.watch(['./build/*.js']);
    gulp.watch(['./assets/**/*']);
});
