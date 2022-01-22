
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
