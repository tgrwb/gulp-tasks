
const {src} = require('gulp');

const GulpRimraf = require('gulp-rimraf'); // Удаление файлов

module.exports = function () {
    const params = require('./_get_tgrwb_gulp_config.js')('clean');
    return src(params.globs, {read: false, cwd: params.cwd})
        .pipe(GulpRimraf());
};
