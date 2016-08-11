var assemble = require('./src/assemble');

module.exports = function SuperPreviewClient(opts) {
    return {
        assemble: assemble(opts)
    }
}