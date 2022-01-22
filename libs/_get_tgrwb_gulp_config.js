
const fs = require('fs');
const path = require('path');

module.exports = function (moduleName) {

	let cwd = process.cwd();
	let params = {};

	// Get base params
	let json = require('./../tgrwb.gulp.json');
	let pathToJson = path.resolve(cwd, 'tgrwb.gulp.json');
	let customJson = fs.existsSync(pathToJson) ? require(pathToJson) : {};
	for (let i in customJson) {
		json[i] = customJson[i];
	}

	// Get params
	if (moduleName) {
		let pathToParams = path.resolve(cwd, 'tgrwb.gulp.' + moduleName + '.js');
		params = require('./../tgrwb.gulp.' + moduleName + '.js')(json);
		let customParams = fs.existsSync(pathToParams) ? require(pathToParams)(json) : {};
		for (let i in customParams) {
			params[i] = customParams[i];
		}
	} else {
		params = json;
	}

	params.cwd = cwd;

	return params;
};
