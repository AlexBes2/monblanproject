const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css"); // заменили устаревший gulp-minify-css
const terser = require("gulp-terser"); // реальная минификация JS
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const avif = require("gulp-avif"); // конвертация jpg/png -> avif

// Paths
const paths = {
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
  html: "src/**/*.html",
  imagesRaster: "src/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", // конвертируем в avif, оригиналы не копируем
  imagesOther: [
    "src/images/**/*",
    "!src/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  ], // svg, gif, webp и т.п. — для них avif не делаем, копируем как есть
  dist: "dist/",
};

// SCSS task
gulp.task("scss", function () {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(cleanCSS()) // минификация CSS
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(sourcemaps.write(".")) // создаёт main.min.css.map рядом с файлом
    .pipe(gulp.dest(paths.dist + "css/"));
});

// JavaScript task
gulp.task("js", function () {
  return gulp
    .src([
      "src/js/constants.js",
      "src/js/ui-utils.js",
      "src/js/posts-manager.js",
      "src/js/calendar-manager.js",
      "src/js/view-manager.js",
      "src/js/app.js",
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(terser()) // минификация JS
    .pipe(
      rename({
        suffix: ".min",
      }),
    )
    .pipe(sourcemaps.write(".")) // создаёт main.min.js.map рядом с файлом
    .pipe(gulp.dest(paths.dist + "js/")); // только main.min.js
});

// HTML task
gulp.task("html", function () {
  return gulp.src(paths.html).pipe(gulp.dest(paths.dist));
});

// Копируем только то, что НЕ конвертируется в avif (svg, gif, webp и т.д.)
gulp.task("images:copy", function () {
  return gulp.src(paths.imagesOther).pipe(gulp.dest(paths.dist + "images/"));
});

// Конвертируем jpg/png в AVIF (оригиналы в dist не дублируем)
gulp.task("images:avif", function () {
  return gulp
    .src(paths.imagesRaster)
    .pipe(
      avif({
        quality: 85, // 80-90 — визуально без потерь, при этом размер заметно меньше
        // lossless: true,  // раскомментируй для побитовой "без потерь" (файлы будут крупнее)
        speed: 4, // 0 = медленнее/меньше файл, 8 = быстрее/крупнее файл
      }),
    )
    .pipe(gulp.dest(paths.dist + "images/"));
});

// Общая задача картинок: avif для jpg/png + копия остальных форматов
gulp.task("images", gulp.parallel("images:copy", "images:avif"));

// Watch task
gulp.task("watch", function () {
  gulp.watch(paths.scss, gulp.series("scss"));
  gulp.watch(paths.js, gulp.series("js"));
  gulp.watch(paths.html, gulp.series("html"));
  gulp.watch("src/images/**/*", gulp.series("images"));
});

// Build task
gulp.task(
  "build",
  gulp.series("scss", "js", "html", "images", function (done) {
    console.log("✅ Build complete!");
    done();
  }),
);

// Default task
gulp.task("default", gulp.series("build", "watch"));
