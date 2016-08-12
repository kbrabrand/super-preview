var assemble = require('./src/assemble');

module.exports = function SuperPreviewClient(opts) {
    console.log(opts);

    return {
        assemble: assemble(opts)
    }
}