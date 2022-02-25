
exports.default = function (cb) {
    for (var i in exports) {
        console.log('gulp ' + i);
    }
    cb();
};

//
// ==================== version ====================
//

const version = require('@tgrwb/gulp-version');

exports.version = version('version');
exports.ooo = version('ooo');
exports.ool = version('ool');
exports.olo = version('olo');
exports.loo = version('loo');
exports.oooa = version('oooa');
exports.oola = version('oola');
