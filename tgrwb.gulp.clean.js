
module.exports = (baseParams)=>{

	const {dirDist} = baseParams;

	return {
		globs: [
			`${dirDist}/*`
		]
	};
};
