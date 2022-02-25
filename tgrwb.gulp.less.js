
const path = require('path');

module.exports = (baseParams)=>{

    const {src, dist, assets} = baseParams;

    return {
        src: path.join(src),
        glob: `${src}/**/${assets}/styles/*.less`,
        ignore: [
            `**/_*.less`
        ],
        dist: path.join(dist)
    };
};
