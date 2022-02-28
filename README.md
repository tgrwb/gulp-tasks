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
npm i -D webpack glob webpack-stream gulp-ignore gulp-uglify-es gulp-sourcemaps gulp-rev gulp-if
```

## tgrwb.gulp.json (optional)

```
{
	"src": "src",
	"dist": "dist",
	"assets": "assets"
}
```

## tgrwb.gulp.webpack.js (optional)

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


# copy
Copy files

## install

```
npm i -D gulp-rename gulp-flatmap gulp-newer
```

## tgrwb.gulp.json (optional)

```
{
	"src": "src",
	"dist": "dist"
}
```

## tgrwb.gulp.copy.js (optional)

```

const path = require('path');

module.exports = (baseParams)=>{

    const {src, dist} = baseParams;

    return {
        globs: `${src}/**/.tgrwb.gulp.copy.json`,
        rename: [
			{pattern: /(?:^|.*\/)_([^\/]+(?:\/|$))/, replacement: '$1'}
        ],
        dist: path.join(dist)
    };
};


```

## src/.tgrwb.gulp.copy.json

```
{
	"files": [
		"screenshot.png",
		"images/**",
		"vendor/**",
		"style.css"
	]
}

```

## Usage in gulpfile.js

```
exports.copy = require('@tgrwb/gulp-tasks/libs/copy');
```

or

```
const {series, parallel} = require('gulp');
const copy = require('@tgrwb/gulp-tasks/libs/copy');

exports.build = series(
	parallel(
		...,
		...,
		...
	),
	parallel(
		...,
		...,
		copy,
		...
	)
);
```


# less
Run less in gulpfile.js

## install

```
npm i -D less gulp-clean-css gulp-ignore gulp-less gulp-postcss gulp-rename gulp-sourcemaps less-plugin-npm-import gulp-rev gulp-clone gulp-if
```

## tgrwb.gulp.json (optional)

```
{
	"src": "src",
	"dist": "dist",
	"assets": "assets"
}
```

## tgrwb.gulp.less.js (optional)

```
const path = require('path');

module.exports = (baseParams)=>{

	const {src, dist, assets} = baseParams;

	return {
		src: path.join(src),
		glob: `${src}/**/${assets}/styles/*.js`,
		ignore: [
			`**/_*.js`
		],
		dist: path.join(dist)
	};
};
```

## Usage in gulpfile.js

```
exports.less = require('@tgrwb/gulp-tasks/libs/less');
```

or

```
const {series, parallel} = require('gulp');
const less = require('@tgrwb/gulp-tasks/libs/less');

exports.build = series(
	parallel(
		...,
		...,
		...
	),
	parallel(
		...,
		...,
		less,
		...
	)
);
```