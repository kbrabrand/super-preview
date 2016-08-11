var path = require('path');
var merge = require('lodash.merge');

module.exports = function SuperPreviewClient(opts) {
    opts = merge({
        qTablePath: path.join(__dirname, 'q-table.xml'),
        imagick: null
    }, (options || {}));

    return {
        /**
         * Compress an inputBuffer (containing image data). Compressed
         * image data is returned to the callback function.
         *
         * @param inputBuffer Image data
         * @param cb function Callback function
         */
        compress: function compress(inputBuffer, cb) {
            if (!opts.imagick) {
                console.warn('imagick must be passed to the SuperPreviewClient in order to compress images');
                return;
            }

            imagick(inputBuffer, 'image.jpg')
                .resize(42, 42)
                .extent(42, 42)
                .noProfile()
                .quality(20)
                .define('jpeg:q-table=' + opts.qTablePath)
                .define('jpeg:optimize-coding=false')
                .toBuffer('JPG', function(err, outputBuffer) {
                    if (err) {
                        return cb(err);
                    }

                    cb(null, outputBuffer);
                });
        },

        assemble: function assemble(inputBuffer, cb) {
            // Stich together the file from the super-preview buffer
        }
    }
}