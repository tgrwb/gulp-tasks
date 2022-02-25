
const path = require('path');
const {src, dest} = require('gulp');
const GulpRename = require('gulp-rename'); // Переименование файлов
const GulpNewer = require('gulp-newer'); // Проверяет время изменения конечного файла
const GulpFrep = require('gulp-frep'); // Замена данных в файле по шаблонам

const rename = [
    {pattern: /\\/g, replacement: '/'},
    {pattern: /\/+$/, replacement: ''}
];


module.exports = function () {
    const params = require('./_get_tgrwb_gulp_config.js')('php');

    params.rename.unshift(rename[0]);
    params.rename.push(rename[1]);

    return src(params.globs, {cwd: params.cwd})
        .pipe(GulpRename(path=>{
            path.dirname = _str_replace_arr(path.dirname, params.rename);
        }))
        .pipe(GulpNewer(params.dist))
        .pipe(GulpFrep(params.frep))
        .pipe(dest(params.dist));
};


function _str_replace_arr(str, arr) {
    for (var i in arr) {
        str = str.replace(arr[i].pattern, arr[i].replacement);
    }
    return str;
}
