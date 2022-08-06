
/* global process */

const fs = require('fs');
const path = require('path');

const Glob = require('glob'); // Возвращает список файлов по заданным параметрам
const WebpackSream = require('webpack-stream'); // Запуск WebPack
const EventStream = require('event-stream');

const {dest} = require('gulp');

const GulpIgnore = require('gulp-ignore');
const GulpUglifyEs = require('gulp-uglify-es').default;
const GulpSourcemaps = require('gulp-sourcemaps');
const GulpRev = require('gulp-rev');
const GulpIf = require('gulp-if');
const GylpClone = require('gulp-clone');
const GulpRename = require('gulp-rename'); // Переименование файлов

module.exports = {
    build,
    watch
};

function build(cb) {
    const params = require('./_get_tgrwb_gulp_config.js')('webpack');
    return _webpack(cb, params);
}

function watch(cb) {
    const params = require('./_get_tgrwb_gulp_config.js')('webpack');
    return _webpack(cb, params, true);
}
/**
 *
 * @param {function} cb
 * @param {object} params
 * @param {boolean} isWatch
 * @returns {object|null}
 */
function _webpack(cb, params, isWatch = false) {

    // Search path
    const cwd = process.cwd();
    const webpackConfigPath = path.resolve(cwd, 'webpack.config.js');

    // If file readable
    if (fs.existsSync(webpackConfigPath)) {

        // Get webpack config
        const config = require(webpackConfigPath);

//        config.mode = 'production';
        config.mode = 'development';
        config.watch = isWatch;
        config.entry = {};
        config.output = {
            publicPath: '',
            filename: '[name].js'
        };
        config.devtool = 'inline-source-map';
        config.optimization = config.optimization || {};
        config.optimization.minimizer = [];

        // Search files
        let files = Glob.sync(params.glob, {
            cwd,
            ignore: params.ignore,
            realpath: true
        });

        // Adds files list
        let src = path.join(params.cwd, params.src);
        for (let i in files) {
            let name = path.parse(files[i]).name;
            let dir = path.parse(files[i]).dir;
            let rel = path.relative(src, dir);
            let new_name = path.join(rel, name).replace(/\\/g, '/');
            config.entry[new_name] = files[i];
        }

        const js = WebpackSream(config);

        const jsMin = js.pipe(GylpClone())
            .pipe(GulpRename({extname: '.min.js'}));

        return EventStream.merge(js, jsMin)
            .pipe(GulpRev())
            .pipe(GulpSourcemaps.init({loadMaps: true}))
            .pipe(GulpIf(/.*\.min\.js$/, GulpUglifyEs({
                output: {
                    comments: false
                }
            })))
            .pipe(GulpIf(/(?<!\.min)\.js$/, GulpSourcemaps.write('.')))
            .pipe(GulpIf(/\.min\.js$/, GulpSourcemaps.write('.'))) // Включить для добавления .map для сжатых файлов
            .pipe(dest(params.dist))
            .pipe(GulpIgnore.exclude('*.map'))
            .pipe(GulpRev.manifestAsync('manifest.scripts.json'))
            .pipe(dest(params.dist))
            ;
    } else {
        cb();
}
}