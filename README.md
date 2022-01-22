# tgrwb/gulp-tasks
Gulp tasks for a quick project start.

## install

```
npm i -D tgrwb/gulp-tasks
```


# clean
Easy directory cleanup

## install

```
npm i -D gulp gulp-rimraf
```

## tgrwb.gulp.json (optional)

```
{
	"dist": "your/dist_directory"
}
```

## tgrwb.gulp.clean.js (optional)

```
module.exports = (baseParams)=>{

	const {dist} = baseParams;

	return {
		globs: [
			`${dist}/*`
		]
	};
};
```

## Usage in gulpfile.js

```
exports.clean = require('@tgrwb/gulp-tasks/libs/clean');
```

or

```
const {series, parallel} = require('gulp');
const clean = require('@tgrwb/gulp-tasks/libs/clean');

exports.build = series(
	clean,
	parallel(
		...,
		...,
		...
	),
	parallel(
		...,
		...,
		...
	)
);
```


# php
Copy, rename and replace for *.php

## install

```
npm i -D gulp-rename gulp-newer gulp-frep
```

## tgrwb.gulp.json (optional)

```
{
	"src": "src",
	"dist": "dist",
	"php_namespace": "your\\namespace",
	"php_wpTextdomain": "your_textdomain"
}
```

## tgrwb.gulp.php.js (optional)

```
const path = require('path');

module.exports = (baseParams)=>{

	const {src, dist, php_namespace, php_wpTextdomain} = baseParams;

	return {
		globs: `${src}/**/*.@(php|xml)`,
		rename: [ // rename file path
			{pattern: /(?:^|.*\/)_([^\/]+(?:\/|$))/, replacement: '$1'}
		],
		frep: [ // replace in files
			{pattern: /((?:\s|\\))src((?:;|\\))/g, replacement: `$1${php_namespace}$2`},
			{pattern: /((?:'|"))tgrwb_textdomain((?:_admin)?(?:'|"))/g, replacement: `$1${php_wpTextdomain}$2`}
		],
		dist: path.join(dist)
	};
};
```

## Usage in gulpfile.js

```
exports.php = require('@tgrwb/gulp-tasks/libs/php');
```

or

```
const {series, parallel} = require('gulp');
const php = require('@tgrwb/gulp-tasks/libs/php');

exports.build = series(
	parallel(
		...,
		...,
		...
	),
	parallel(
		...,
		...,
		php,
		...
	)
);
```


# webpack
Run webpack in gulpfile.js

## install

```
npm i -D webpack webpack-stream glob
```

## tgrwb.gulp.json (optional)

```
{
	"src": "src",
	"dist": "dist",
	"assets": "assets"
}
```

## tgrwb.gulp.php.js (optional)

```
const path = require('path');

module.exports = (baseParams)=>{

	const {src, dist, assets} = baseParams;

	return {
		src: path.join(src),
		glob: `${src}/**/${assets}/scripts/*.js`,
		ignore: [
			`**/_*.js`
		],
		dist: path.join(dist)
	};
};
```

## Usage in gulpfile.js

```
exports.webpack_build = require('@tgrwb/gulp-tasks/libs/webpack').build;
exports.webpack_watch = require('@tgrwb/gulp-tasks/libs/webpack').watch;
```

or

```
const {series, parallel} = require('gulp');
const webpack_build = require('@tgrwb/gulp-tasks/libs/webpack').build;

exports.build = series(
	parallel(
		...,
		...,
		...
	),
	parallel(
		...,
		...,
		webpack_build,
		...
	)
);
```