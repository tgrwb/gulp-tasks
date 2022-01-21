# gulp-tasks
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

## gulpfile.js

```
const clean = require('@tgrwb/gulp-tasks').clean;
```

## tgrwb.gulp.json (optional)

```
{
	"dirDist": "your/dist_directory"
}
```

## tgrwb.gulp.clean.js (optional)

```
module.exports = (baseParams)=>{

	const {dirDist} = baseParams;

	return {
		globs: [
			`${dirDist}/*`
		]
	};
};
```

## Usage

```
const clean = require('@tgrwb/gulp-tasks').clean;
exports.clean = clean;
```

or

```
const {series, parallel} = require('gulp');
const clean = require('@tgrwb/gulp-tasks').clean;

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
