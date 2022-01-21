
const path = require('path');

module.exports = (baseParams)=>{

	const {dirSrc, dirDist, php_namespace, php_wpTextdomain} = baseParams;

	return {
		globs: `${dirSrc}/**/*.@(php|xml)`,
		rename: [
			{pattern: /(?:^|.*\/)_([^\/]+(?:\/|$))/, replacement: '$1'}
		],
		frep: [
			{pattern: /((?:\s|\\))src((?:;|\\))/g, replacement: `$1${php_namespace}$2`},
			{pattern: /((?:'|"))tgrwb_textdomain((?:_admin)?(?:'|"))/g, replacement: `$1${php_wpTextdomain}$2`}
		],
		dist: path.join(dirDist)
	};
};
