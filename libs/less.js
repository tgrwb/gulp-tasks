
const fs = require('fs');
const path = require('path');

const {src, dest} = require('gulp');
const GulpCleanCSS = require('gulp-clean-css');
const GulpIgnore = require('gulp-ignore');
const GulpLess = require('gulp-less');
const GulpPostcss = require('gulp-postcss');
const GulpRename = require('gulp-rename'); // Переименование файлов
const GulpSourcemaps = require('gulp-sourcemaps');
const GulpRev = require('gulp-rev');
const GylpClone = require('gulp-clone');
const GulpIf = require('gulp-if');

const GylpCloneSink = GylpClone.sink();

const LessPluginNpmImport = require("less-plugin-npm-import");

module.exports = function () {
    const params = require('./_get_tgrwb_gulp_config.js')('less');
    //
    const pathToParams = path.resolve(params.cwd, 'postcss.plugins.js');
    const postcssPlugins = fs.existsSync(pathToParams) ? require(pathToParams) : {};
    //
    return src(params.glob, {cwd: params.cwd, ignore: params.ignore})
        .pipe(GulpLess({
            sourceMap: true,
            rewriteUrls: 'local',
            relativeUrls: false,
            rootpath: '',
            plugins: [
                new LessPluginNpmImport({
                    prefix: '~'
                })
            ]
        }))
        .pipe(GulpPostcss(postcssPlugins))
//        .pipe(GylpCloneSink)
//        //
//        .pipe(GulpRename({extname: '.min.css'}))
//        .pipe(GulpCleanCSS({
//            inline: ['none']
//        }))
//        //
//        .pipe(GylpCloneSink.tap())
        .pipe(GulpRev())
        .pipe(GulpSourcemaps.init())
        .pipe(GulpIf(/(?<!\.min)\.css$/, GulpSourcemaps.write('.')))
        .pipe(GulpIf(/\.min\.css$/, GulpSourcemaps.write('.'))) // Включить для добавления .map для сжатых файлов
        .pipe(dest(params.dist))
        .pipe(GulpIgnore.exclude('*.map'))
        .pipe(GulpRev.manifest('manifest.styles.json'))
        .pipe(dest(params.dist))
        ;
};
