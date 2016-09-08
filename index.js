var path = require('path');
var merge = require('lodash.merge');

var compress = require('./src/compress');
var assemble = require('./src/assemble');

module.exports = function SuperPreviewClient(opts) {
    var options = merge({
        qTablePath: path.join(__dirname, '..', 'q-table.xml'),
        imageHeader: require('./image-header')
    }, opts);

    return {
        compress: compress(opts),
        assemble: assemble(opts)
    }
}