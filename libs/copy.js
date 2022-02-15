
const path = require('path');
const {src, dest} = require('gulp');
const GulpRename = require('gulp-rename'); // Переименование файлов
const GulpFlatmap = require('gulp-flatmap'); // Обрабатывает содержимое файла
const GulpNewer = require('gulp-newer'); // Проверяет время изменения конечного файла

const rename = [
    {pattern: /\\/g, replacement: '/'},
    {pattern: /\/+$/, replacement: ''}
];

module.exports = function () {
    const params = require('./_get_tgrwb_gulp_config')('copy');

    params.rename.unshift(rename[0]);
    params.rename.push(rename[1]);

    return src(params.globs, {cwd: params.cwd})
        .pipe(
            GulpFlatmap(
                function (stream, file) {
                    var contents = JSON.parse(file.contents.toString('utf8'));
                    if (contents.files && contents.files.length) {
                        return src(contents.files, {cwd: file.base, cwdbase: true})
                            .pipe(GulpRename(path=>{
                                path.dirname = _str_replace_arr(path.dirname, params.rename);
                            }))
                            .pipe(GulpNewer(params.dist))
                            .pipe(dest(params.dist));
                    } else {
                        return stream;
                    }
                }
            )
            );
};


function _str_replace_arr(str, arr) {
    for (var i in arr) {
        str = str.replace(arr[i].pattern, arr[i].replacement);
    }
    return str;
}
