var prefixHeader = require('../assets/image-header');

module.exports = function(opts) {
    console.log(opts);

    return function assemble(compressed, cb) {
        return {
            width: parseInt(compressed.slice(0, 2), 10),
            height: parseInt(compressed.slice(3, 2), 10),
            base64: Buffer.concat([
                prefixHeader,
                new Buffer(compressed.slice(6))
            ]).toString('base64')
        }
    }
};