
const path = require('path');

module.exports = (baseParams)=>{

	const {dirSrc, dirDist, dirAssets, webpack_src} = baseParams;

	return {
		src: path.join(dirSrc),
		glob: `${dirSrc}/**/${dirAssets}/scripts/*.js`,
		ignore: [
			`**/_*.js`
		],
		dist: path.join(dirDist)
	};
};
