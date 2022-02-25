
module.exports = (baseParams)=>{

    const {dist} = baseParams;

    return {
        globs: [
            `${dist}/*`
        ]
    };
};
