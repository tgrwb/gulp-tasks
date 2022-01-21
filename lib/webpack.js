
/* global process */

const {dest} = require('gulp');

const fs = require('fs');
const path = require('path');
const Glob = require('glob'); // Возвращает список файлов по заданным параметрам
const WebpackSream = require('webpack-stream'); // Запуск WebPack

module.exports = {
	build,
	watch
};

function build(cb) {
	const params = require('./_get_tgrwb_gulp_config.js')('webpack');
	return _webpack(cb, params)
		.pipe(dest(params.dist));
}

function watch(cb) {
	const params = require('./_get_tgrwb_gulp_config.js')('webpack');
	return _webpack(cb, params, true)
		.pipe(dest(params.dist));
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

		config.mode = 'production';
		config.watch = isWatch;
		config.entry = {};

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
			config.entry[new_name + '.min'] = files[i];
		}

		return WebpackSream(config);
	} else {
		cb();
}
}
