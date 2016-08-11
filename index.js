var compress = require('./src/compress');
var assemble = require('./src/assemble');

module.exports = function SuperPreviewClient(opts) {
    return {
        compress: compress(opts),
        assemble: assemble(opts)
    }
}