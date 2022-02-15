
const path = require('path');

module.exports = (baseParams)=>{

    const {src, dist} = baseParams;

    return {
        globs: `${src}/**/.tgrwb.gulp.copy.json`,
        rename: [
//			{pattern: /(?:^|.*\/)_([^\/]+(?:\/|$))/, replacement: '$1'}
        ],
        dist: path.join(dist)
    };
};
